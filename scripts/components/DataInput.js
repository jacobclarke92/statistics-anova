import React, { Component, PropTypes } from 'react'
import _set from 'lodash/set'
import _get from 'lodash/get'

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
		const storedState = localStorage.getItem('DataInput_state');
		this.state = storedState ? JSON.parse(storedState) : {
			schemaTypeKey: null,
			schemaType: {variables: 0},
			schema: [],
			data: [],
		};
	}

	componentDidUpdate() {
		localStorage.setItem('DataInput_state', JSON.stringify(this.state));
		const { data } = this.state;
		if(data.length) {
			const empty = data[data.length-1].reduce((prev, current) => prev === false ? false : (current === null || typeof current == 'undefined' || current == ''), true);
			if(empty) {
				data.pop();
				this.setState({data});
			}
		}
	}

	handleDataTypeChange(schemaTypeKey) {
		const schemaType = options.filter(option => option.value === schemaTypeKey)[0] || {variables: 0};
		const schema = this.state.schema;
		while(schema.length > schemaType.variables) schema.pop();
		const data = [];
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
			data,
		});
	}

	addLevel(variable) {
		const schema = this.state.schema.map(_variable => {
			if(_variable == variable) _variable.levels.push({name: (variable.levels.length+1)+' '+variable.name});
			return _variable;
		});
		this.setState({schema});
	}

	removeLevel(variable, level) {
		const schema = this.state.schema.map(_variable => {
			if(_variable == variable) _variable.levels = _variable.levels.filter(_level => level != _level);
			return _variable;
		});
		this.setState({schema});
	}

	getWithinGroupHeadings() {
		const { schema, schemaType, schemaTypeKey } = this.state;
		// const totalLevels = schema.reduce((prev, variable) => prev * (variable.levels.length || 1), 1);
		const totalLevels = schema[0].levels.length * schema[1].levels.length;
		const columns = [];
		for(var i=0, v1=0, v2=0; i<totalLevels; i++) {
			columns.push( <td key={i}>{schema[1].levels[v2].name}<br />{schema[0].levels[v1].name}</td> )
			if(++v1 >= schema[0].levels.length) {
				v1 = 0;
				v2 ++;
			}
		}
		
		return columns;
	}

	renderColumnInputs(row) {
		const { data, schema, schemaType, schemaTypeKey } = this.state;
		const betweenGroups = schemaTypeKey.indexOf('BG') > -1;
		const withinGroups = schemaTypeKey.indexOf('WG') > -1;
		if(betweenGroups) return schema.map((variable, v) => 
			<td key={v}>
				<Select 
					options={variable.levels.map((level, l) => ({value: l, text: level.name}))}
					value={_get(this.state, 'data['+row+']['+v+']', '') || ''} 
					onChange={value => this.setState(_set(this.state, 'data['+row+']['+v+']', value))} />
				{/*
				<Input
					value={_get(this.state, 'data['+row+']['+v+']', '') || ''} 
					onChange={value => this.setState(_set(this.state, 'data['+row+']['+v+']', value))} />
				*/}
			</td>
		);
	}

	render() {
		const { data, schema, schemaType, schemaTypeKey } = this.state;
		console.log(schema, data);
		const betweenGroups = schemaTypeKey.indexOf('BG') > -1;
		const withinGroups = schemaTypeKey.indexOf('WG') > -1;
		

		return (
			<div className="data-input">
				<div className="input">
					<label>ANOVA Raw Data</label>
					<Select value={schemaTypeKey} options={options} empty="Select data input type" onChange={::this.handleDataTypeChange} />
				</div>
				<div className="independant-variables">
					{schema.map((variable, i) => 
						<div key={i} className="independant-variable">
							<Input label={'Independant variable '+(i+1)} value={variable.name} placeholder="Type variable name..." onChange={value => this.setState(_set(this.state, 'schema['+i+'].name', value))} />
							<div className="variable-levels">
								{variable.levels.map((level, l) => 
									<div key={l} className="input-flex">
										<Input key={l} value={level.name} placeholder="Type level name..." onChange={value => this.setState(_set(this.state, 'schema['+i+'].levels['+l+'].name', value))} />
										<Button text="Remove" onClick={() => this.removeLevel(variable, level)} />
									</div>
								)}
								<Button text="Add level" onClick={() => this.addLevel(variable)} />
							</div>
						</div>
					)}
				</div>

				<table border="1" cellSpacing="0" cellPadding="5">
					<thead>
						{betweenGroups && 
							<tr>
								<td>ID</td>
								{schema.map((variable, i) => 
									<td key={i}>{variable.name}</td>
								)}
								<td>Result</td>
							</tr>
						}
						{schemaTypeKey == 'WG1F' &&
							<tr>
								<td>ID</td>
								{schema[0].levels.map((level, i) => 
									<td key={i}>{level.name}</td>
								)}
							</tr>
						}
						{schemaTypeKey == 'WGF' && 
							<tr>
								<td>ID</td>
								{this.getWithinGroupHeadings()}
							</tr>
						}
						{schemaTypeKey == 'MGF' && 
							<tr>
								<td>ID</td>
								<td>{schema[0].name}</td>
								{schema[1].levels.map((level, i) => 
									<td key={i}>{level.name}</td>
								)}
							</tr>
						}
							
					</thead>
					<tbody>
						{data.map((row, r) => 
							<tr key={r}>
								<td>{r+1}</td>
								{this.renderColumnInputs(r)}
								{betweenGroups && 
									<td>
										<Input 
											type="number"
											value={_get(this.state, 'data['+r+']['+schema.length+']', '') || ''} 
											onChange={value => this.setState(_set(this.state, 'data['+r+']['+schema.length+']', value))} />
									</td>
								}
							</tr>
						)}
						<tr>
							<td>{data.length+1}</td>
							{this.renderColumnInputs(data.length)}
							{betweenGroups && 
								<td>
									<Input 
										type="number"
										value={_get(this.state, 'data['+data.length+']['+schema.length+']', '') || ''} 
										onChange={value => this.setState(_set(this.state, 'data['+data.length+']['+schema.length+']', value))} />
								</td>
							}
						</tr>
					</tbody>
				</table>

				<Button text="Reset Data" onClick={() => this.setState({data: []})} />

			</div>
		)
	}
}