import React, { Component, PropTypes } from 'react'
import _set from 'lodash/set'
import Select from './Select'
import Input from './Input'
import Button from './Button'

const options = [
	{
		value: '1G',
		text: 'One Group',
		info: '',
		variables: 1,
		allowLevels: false,
	},
	{
		value: 'BG1F',
		text: 'Between Groups One Factor',
		info: '',
		variables: 1,
		allowLevels: true,
	},
	{
		value: 'WG1F',
		text: 'Within Groups One Factor',
		info: '',
		variables: 1,
		allowLevels: true,
	},
	{
		value: 'BGF',
		text: 'Between Groups Factorial',
		info: '',
		variables: 2,
		allowLevels: true,
	},
	{
		value: 'WGF',
		text: 'Within Groups Factorial',
		info: '',
		variables: 2,
		allowLevels: true,
	},
	{
		value: 'MGF',
		text: 'Mixed Groups Factorial',
		info: '',
		variables: 2,
		allowLevels: true,
	},

]
// three levels of an independant variable
export default class KeyValueTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			schemaTypeKey: '',
			schemaType: {variables: 0},
			schema: [],
			data: [],
		};
	}

	handleDataTypeChange(schemaTypeKey) {
		const schemaType = options.filter(option => option.value === schemaTypeKey)[0] || {variables: 0};
		
		const schema = this.state.schema;
		for(let i=0; i<schemaType.variables; i++) {
			if(!schema[i]) schema[i] = {
				name: '',
				levels: [],
			};
		}
		this.setState({
			schemaTypeKey,
			schemaType,
			schema,
		});
	}

	addLevel(variable) {
		const schema = this.state.schema.map(_variable => {
			if(_variable == variable) _variable.levels.push({name: variable.name+' '+(variable.levels.length+1) });
			return _variable;
		});
		this.setState({schema});
	}

	getWithinGroupHeadings() {
		const { schema, schemaType, schemaTypeKey } = this.state;
		const totalLevels = schema.reduce((prev, variable) => prev * variable.levels.length, 1);
		const columns = [];
		for(var i=0, v=0, c=0; i<totalLevels; i ++) {
			columns.push(
				<td key={i}>{schema[v].levels[c].name}</td>
			);
			c ++;
			if(c >= schema[v].levels.length) {
				c = 0;
				v ++;
			}
		}
		console.log(columns);
		return columns;
	}

	render() {
		const { schema, schemaType, schemaTypeKey } = this.state;
		console.log(schema);
		const betweenGroups = schemaTypeKey.indexOf('BG') > -1;
		const withinGroups = schemaTypeKey.indexOf('WG') > -1;
		

		return (
			<div className="data-input">
				<Select options={options} empty="Select data input type" onChange={::this.handleDataTypeChange} />
				<div className="independant-variables">
					{schema.map((variable, i) => 
						<div key={i} className="independant-variable">
							<Input label={'Independant variable '+(i+1)} value={variable.name} placeholder="Type variable name..." onChange={value => this.setState(_set(this.state, 'schema['+i+'].name', value))} />
							<div className="variable-levels">
								{variable.levels.map((level, l) => 
									<Input key={l} value={level.name} placeholder="Type level name..." onChange={value => this.setState(_set(this.state, 'schema['+i+'].levels['+l+'].name', value))} />
								)}
								<Button text="Add level" onClick={() => this.addLevel(variable)} />
							</div>
						</div>
					)}
				</div>

				<table border="1" cellSpacing="0" cellPadding="0">
					<thead>
						{betweenGroups && 
							<tr>
								<td>ID</td>
								{schema.map((variable, i) => 
									<td key={i}>{variable.name}</td>
								)}
							</tr>
						}
						{withinGroups && 
							<tr>
								<td>ID</td>
								{this.getWithinGroupHeadings()}
							</tr>
						}
							
					</thead>
					<tbody>

					</tbody>
				</table>

			</div>
		)
	}
}