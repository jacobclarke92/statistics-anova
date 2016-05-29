import Chart from 'chart.js'

const defaultSettings = {
	width: 500,
	height: 350,
	margin: {
		top: 15,
		right: 15,
		bottom: 15,
		left: 15,
	},
};

export default class Graph {
	
	constructor(_settings) {
		const settings = Object.assign({}, defaultSettings, _settings);
		for(let key in settings) this[key] = settings[key];
	}

	generateData() {
		if(!this.ANOVA) return [];
		const { data, conditions, conditionMeasurement } = this.ANOVA;
		const formattedData = [];
		for(var i=0, x=-1; i < data.length; i ++) {
			if(i%conditions.length === 0) formattedData[++x] = {};
			const condition = conditions[i%conditions.length];
			const observation = data[i];
			formattedData[x][condition] = observation;
		}
		return formattedData;
	}

	createGraphInstance() {

		const { data, subjectMeasurement, conditionMeasurement } = this.ANOVA;
	}

}