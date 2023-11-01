//XXX: Why are we getting &amp characters in site-map.txt?
export function ASCIItoUTF8(asciiString) {
	return asciiString.replace(/&amp;#(\d+);/g, function(match, number) {
		return String.fromCharCode(Number(number));
	});
}