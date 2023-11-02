//XXX: Why are we getting ASCII characters in jupyter.html?
export function ASCIItoUTF8(asciiString, pattStr='') {
    let rePattern = new RegExp('&' + pattStr + '#(\\d+);', 'g');
	return asciiString.replace(rePattern, function(match, number) {
		return String.fromCharCode(Number(number));
	});
}