import { fprob, fdistr } from '../utils/statUtils'

export default class ANOVA {
	
	/**
	 * @param  {Number[]}	- Data
	 * @param  {Number[]}	- Conditions/treatments
	 * @param  {String}		- Measurement e.g. ms
	 */
	constructor(data = [], conditions = [], conditionMeasurement = '', subjectMeasurement = '') {
		this.data = data;
		this.conditions = conditions;
		this.subjectMeasurement = subjectMeasurement;
		this.conditionMeasurement = conditionMeasurement;
		this.subjects = data.length/conditions.length;
		this.observations = data.length;  // AKA 'N'
	}

	getSubjectTotals() {
		const subjectTotals = [];
		for(var i=0, x=-1; i < this.data.length; i ++) {
			if(i%this.conditions.length === 0) x ++;
			if(subjectTotals[x] == undefined) subjectTotals[x] = 0;
			subjectTotals[x] += this.data[i];
		}
		return subjectTotals;
	}

	getConditionTotals() {
		const groupTotals = [];
		for(let i=0; i < this.data.length; i ++) {
			if(groupTotals[i%this.subjects] == undefined) groupTotals[i%this.subjects] = 0;
			groupTotals[i%this.subjects] += this.data[i];
		}
		return groupTotals;
	}


	getSubjectMeans() {
		const subjectTotals = this.getSubjectTotals();
		const subjectMeans = subjectTotals.map(total => total / this.conditions.length);
		return subjectMeans;
	}

	getConditionMeans() {
		const conditionTotals = this.getConditionTotals();
		const conditionMeans = conditionTotals.map(total => total / this.subjects);
		return conditionMeans;
	}

	getGrandMean() {
		// could use subjects or conditions, would get same result
		const subjectMeans = this.getSubjectMeans();

		// adds together all the subject means and divides by number of subjects
		const grandMean = subjectMeans.reduce((prev, current) => prev+current, 0) / this.subjects;
		return grandMean;
	}


	getSumOfSquaresTotal() {
		const grandMean = this.getGrandMean();

		let sumOfSquaresTotal = 0;
		for(let observation of this.data) {
			sumOfSquaresTotal += Math.pow(observation - grandMean, 2);
		}
		return sumOfSquaresTotal;
	}

	getSumOfSquaresSubjects() {
		const grandMean = this.getGrandMean();
		const subjectMeans = this.getSubjectMeans();

		let sumOfSquaresSubjects = 0;
		for(let subjectMean of subjectMeans) {
			sumOfSquaresSubjects += Math.pow(subjectMean - grandMean, 2);
		}
		sumOfSquaresSubjects *= this.conditions.length;
		return sumOfSquaresSubjects;
	}

	getSumOfSquaresBetween() {
		const grandMean = this.getGrandMean();
		const conditionMeans = this.getConditionMeans();

		let sumOfSquaresBetween = 0;
		for(let conditionMean of conditionMeans) {
			sumOfSquaresBetween += Math.pow(conditionMean - grandMean, 2);
		}
		sumOfSquaresBetween *= this.subjects;
		return sumOfSquaresBetween;
	}

	getSumOfSquaresWithin() {
		const conditionMeans = this.getConditionMeans();

		let sumOfSquaresWithin = 0;
		for(let i=0; i < this.data.length; i ++) {
			const observation = this.data[i];
			const conditionMean = conditionMeans[i%this.conditions.length];
			sumOfSquaresWithin += Math.pow(observation - conditionMean, 2);
		}
		return sumOfSquaresWithin;
	}

	getSumOfSquaresError() {
		const sumOfSquaresWithin = this.getSumOfSquaresWithin();
		const sumOfSquaresSubjects = this.getSumOfSquaresSubjects();

		const sumOfSquaresError = sumOfSquaresWithin - sumOfSquaresSubjects;
		return sumOfSquaresError;
	}

	getDegreesOfFreedomBetween() {
		return this.conditions.length - 1;
	}

	getDegreesOfFreedomSubjects() {
		return this.subjects - 1;
	}

	getDegreesOfFreedomWithin() {
		return this.data.length - this.conditions.length;
	}

	getDegreesOfFreedomError() {
		const dfWithin = this.getDegreesOfFreedomWithin();
		const dfSubject = this.getDegreesOfFreedomSubjects();

		const degreesOfFreedomError = dfWithin - dfSubject;
		return degreesOfFreedomError;
	}

	getDegreesOfFreedomTotal() {
		return this.data.length - 1;
	}


	getMeanSquaresBetween() {
		const ssBetween = this.getSumOfSquaresBetween();
		const dfBetween = this.getDegreesOfFreedomBetween();
		return ssBetween / dfBetween;
	}

	getMeanSquaresError() {
		const ssError = this.getSumOfSquaresError();
		const dfError = this.getDegreesOfFreedomError();
		return ssError / dfError;
	}

	getF() {
		const msBetween = this.getMeanSquaresBetween();
		const msError = this.getMeanSquaresError();

		const F = msBetween / msError;
		return F;
	}

	getCriticalF(level = 0.05) {
		const dfNumerator = this.getDegreesOfFreedomBetween();
		const dfDenominator = this.getDegreesOfFreedomError();
		const critF = fdistr(dfNumerator, dfDenominator, level);
		return critF;
	}

	getUpperProbabilityOfF() {
		const dfNumerator = this.getDegreesOfFreedomBetween();
		const dfDenominator = this.getDegreesOfFreedomError();
		const F = this.getF();

		const P = fprob(dfNumerator, dfDenominator, F/10);
		return P;
	}


}