import React, { Component, PropTypes } from 'react'
import { get } from '../iconRegistry'

export default class Icon extends Component {

	static defaultProps = {
		name: '',
		size: 24,
		style: {},
		className: '',
	};

	render() {

		const { name, size, style, ...rest } = this.props;
		const styles = {
			...style,
			fill: 'currentcolor',
			verticalAlign: 'middle',
			width: size,
			height: size,
		};

		return (
			<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fit style={styles} {...rest}>
				{get(name)}
			</svg>
		)
	}

}