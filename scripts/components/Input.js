import React, { Component, PropTypes } from 'react'

export default class Select extends Component {

	static defaultProps = {
		Input: 'input',
		options: [],
		onChange: () => {},
		empty: 'Please select...',
	};

	render() {
		const { Input, label, onChange, ...rest } = this.props;
		return (
			<div className="input">
				{label && <label>{label}</label>}
				<Input {...rest} onChange={event => onChange(event.target ? event.target.value : event)} />
			</div>
		)
	}
}