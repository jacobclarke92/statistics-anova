import React, { Component, PropTypes } from 'react'
import ANOVA from './classes/anova'
import Graph from './classes/graph'
import { pr, tr, printDataTable } from './utils/domUtils'

import Navigation from './components/Navigation'


const conditions = [0, 100, 200, 300];
const data = [
	16,	31,	56,	45,
	15,	29,	31,	35,
	18,	15,	25,	21,
	8,	12,	18,	15,
];

const myANOVA = new ANOVA(data, conditions, 'ms', 'nausia');

printDataTable(myANOVA);

document.write('<table border="1" cellspacing="0" cellpadding="5" class="col1-bold"><tbody>');
tr('Subject totals', myANOVA.getSubjectTotals());
tr('Condition totals', myANOVA.getConditionTotals());
tr('Subject means', myANOVA.getSubjectMeans());
tr('Condition means', myANOVA.getConditionMeans());
tr('Grand mean', myANOVA.getGrandMean());
tr('Sum of sqaures Total', myANOVA.getSumOfSquaresTotal());
tr('Sum of sqaures Subjects', myANOVA.getSumOfSquaresSubjects());
tr('Sum of sqaures Between', myANOVA.getSumOfSquaresBetween());
tr('Sum of sqaures Within', myANOVA.getSumOfSquaresWithin());
tr('Degrees of freedom Between', myANOVA.getDegreesOfFreedomBetween());
tr('Degrees of freedom Error', myANOVA.getDegreesOfFreedomError());
tr('F', myANOVA.getF());
tr('Critical F (0.05)', myANOVA.getCriticalF(0.05));
tr('Critical F (0.01)', myANOVA.getCriticalF(0.01));
document.write('</tbody></table>')

export default class App extends Component {
	render() {
		return (
			<div className="app">

				<Navigation />
				<main className="page">
					Hallo
				</main>

			</div>
		)
	}
}