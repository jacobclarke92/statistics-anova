import React, { Component, PropTypes } from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ANOVA from './classes/anova'
import Graph from './classes/graph'

import Navigation from './components/Navigation'
import DataTable from './components/DataTable'
import KeyValueTable from './components/KeyValueTable'
import DataInput from './components/DataInput'


const conditions = [0, 100, 200, 300];
const data = [
	16,	31,	56,	45,
	15,	29,	31,	35,
	18,	15,	25,	21,
	8,	12,	18,	15,
];

class App extends Component {

	constructor(props) {
		super(props);
		const anova = new ANOVA(data, conditions, 'ms', 'nausia');
		const anovaData = {
			'Subject totals': 				anova.getSubjectTotals(),
			'Condition totals': 			anova.getConditionTotals(),
			'Subject means': 				anova.getSubjectMeans(),
			'Condition means': 				anova.getConditionMeans(),
			'Grand mean': 					anova.getGrandMean(),
			'Sum of sqaures Total': 		anova.getSumOfSquaresTotal(),
			'Sum of sqaures Subjects': 		anova.getSumOfSquaresSubjects(),
			'Sum of sqaures Between': 		anova.getSumOfSquaresBetween(),
			'Sum of sqaures Within': 		anova.getSumOfSquaresWithin(),
			'Degrees of freedom Between': 	anova.getDegreesOfFreedomBetween(),
			'Degrees of freedom Error': 	anova.getDegreesOfFreedomError(),
			'F': 							anova.getF(),
			'Critical F (0.05)': 			anova.getCriticalF(0.05),
			'Critical F (0.01)': 			anova.getCriticalF(0.01),
		};

		this.state = {
			anova,
			anovaData,
		};
	}

	render() {
		const { anova, anovaData } = this.state;
		return (
			<div className="app">

				<Navigation />
				<main className="page">


					<DataInput onChange={() => {}} />
					<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
					<DataTable anova={anova} />
					<KeyValueTable data={anovaData} />
				</main>

			</div>
		)
	}
}
export default DragDropContext(HTML5Backend)(App);