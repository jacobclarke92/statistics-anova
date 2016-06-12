import React, { Component, PropTypes } from 'react'

export default class DataTable extends Component {

	render() {
		const { data, conditions, subjectMeasurement, conditionMeasurement, subjects } = this.props.anova;
		const subjectsArr = [];
		for(let i=0; i < subjects; i++) subjectsArr.push(i);
		return (
			<table border="1" cellSpacing="0" cellPadding="5">
				<thead>
					<tr>
						<td>{subjectMeasurement}</td>
						{conditions.map((condition, i) => 
							<td key={i}>{condition}{conditionMeasurement}</td>
						)}
					</tr>
				</thead>
				<tbody>
					{subjectsArr.map((subject, s) => 
						<tr key={s}>
							<td>Subject {s+1}</td>
							{conditions.map((condition, c) => 
								<td key={c}>{data[s*conditions.length + c]}</td>
							)}
						</tr>
					)}
				</tbody>
			</table>
		)
	}
}