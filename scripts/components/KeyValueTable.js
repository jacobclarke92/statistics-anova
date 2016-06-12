import React, { Component, PropTypes } from 'react'

export default class KeyValueTable extends Component {

	render() {
		const { data } = this.props;
		const keys = Object.keys(data);
		return (
			<table border="1" cellSpacing="0" cellPadding="5" className="col1-bold">
				<tbody>
					{keys.map((key, i) => {
						let value = data[key];
						value = (value instanceof Array) ? value.join(', ') : value;
						return (
							<tr key={i}>
								<td>{key}</td>
								<td>{value}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		)
	}
}