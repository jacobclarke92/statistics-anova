import ANOVA from './anova'

const conditions = ['0ms', '100ms', '200ms', '300ms'];
const data = [
	16,	31,	56,	45,
	15,	29,	31,	35,
	18,	15,	25,	21,
	8,	12,	18,	15,
];

const myANOVA = new ANOVA(conditions, data);
console.log('Subject totals:', myANOVA.getSubjectTotals());
console.log('Condition totals:', myANOVA.getConditionTotals());
console.log('Subject means:', myANOVA.getSubjectMeans());
console.log('Condition means:', myANOVA.getConditionMeans());
console.log('Grand mean:', myANOVA.getGrandMean());
console.log('ssTotal:', myANOVA.getSumOfSquaresTotal());
console.log('ssSubjects:', myANOVA.getSumOfSquaresSubjects());
console.log('ssBetween:', myANOVA.getSumOfSquaresBetween());
console.log('ssWithin:', myANOVA.getSumOfSquaresWithin());
console.log('dfBetween:', myANOVA.getDegreesOfFreedomBetween());
console.log('dfError:', myANOVA.getDegreesOfFreedomError());
console.log('F:', myANOVA.getF());
console.log('Critical F (0.05):', myANOVA.getCriticalF(0.05));
console.log('Critical F (0.01):', myANOVA.getCriticalF(0.01));
console.log('Upper Probability of F:', myANOVA.getUpperProbabilityOfF());