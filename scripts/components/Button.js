import React, { Component, PropTypes } from 'react'

export default class Button extends Component {
	render() {
		const { text, children, ...rest } = this.props;
		return (
			<button {...rest}>{children || text}</button>
		)
	}
}