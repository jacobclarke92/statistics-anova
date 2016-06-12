import React, { Component, PropTypes } from 'react'
import Icon from './Icon'

export default class Navigation extends Component {
	render() {
		return (
			<header className="navigation">
				<div className="logo"></div>
				<div className="title"><h1>Statistics ANOVA</h1></div>
				<nav className="nav-tray">
					<Icon name="profile" />
					<Icon name="info" />
				</nav>
			</header>
		)
	}
}