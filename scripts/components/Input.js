import React, { Component, PropTypes } from 'react'

export default class Select extends Component {

	static defaultProps = {
		options: [],
		onChange: () => {},
		empty: 'Please select...',
	};

	render() {
		const { label, onChange, ...rest } = this.props;
		return (
			<div className="input">
				{label && <label>{label}</label>}
				<input {...rest} onChange={event => onChange(event.target.value)} />
			</div>
		)
	}
}