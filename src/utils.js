export function pr(bold, text) {
	document.write('<strong>'+bold+'</strong> '+text+'<br />')
}

export function tr() {
	document.write('<tr>');
	for(let argument of arguments) {
		let value = argument;
		if(value instanceof Array) value = value.join(', ')
		document.write('<td>'+value+'</td>');
	}
	document.write('</tr>')
}

export function printDataTable(ANOVA) {
	const { data, conditions, subjectMeasurement, conditionMeasurement, subjects } = ANOVA;
	document.write('<table border="1" cellspacing="0" cellpadding="5"><thead><tr><td>DATA</td>');
	for(let condition of conditions) {
		document.write('<td>'+condition+conditionMeasurement+'</td>');
	}
	document.write('</tr></thead><tbody>');

	for(let s=0; s < subjects; s++) {
		document.write('<tr><td>Subject '+(s+1)+'</td>');
		for(let c=0; c < conditions.length; c++) {
			const observation = data[s*conditions.length + c];
			document.write('<td>'+observation+'</td>');
		}
		document.write('</tr>');
	}

	document.write('</tbody></table>')

}