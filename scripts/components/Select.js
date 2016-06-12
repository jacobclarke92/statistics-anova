import React, { Component, PropTypes } from 'react'

export default class Select extends Component {

	static defaultProps = {
		options: [],
		onChange: () => {},
		empty: 'Please select...',
	};

	render() {
		const { options, empty, onChange, ...rest } = this.props;
		return (
			<select {...rest} onChange={event => onChange(event.target.value)}>
				<option value={null}>{empty}</option>
				{options.map((option, i) => 
					<option key={i} value={option.value}>{option.text}</option>
				)}
			</select>
		)
	}
}