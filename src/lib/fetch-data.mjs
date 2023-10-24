//INFO: read data for SSG from urls or local files
import { parse as csv_parse } from 'csv-parse/sync'
import fs from 'fs'


export async function fetch_txt(url) {
	if (url.startsWith('http')) {
		return await fetch(url).then( res => res.text() )
	} else {
		url= url.replace(/^.*[\\\/]\.next[\\\/]server/, process.cwd()+'/src');
		//A: use __dirname+'mifile.json' in mdx, __dirname is inside the .next folder
		return fs.readFileSync(url,'utf-8');
	}
}

export async function fetch_json(url) {
	return JSON.parse( await fetch_txt(url) )
}

export async function fetch_csv(url, opts) {
	let rows= csv_parse(await fetch_txt(url), opts) 
	if (!opts.colsAsArray) { return rows }

	let head= rows.shift()
	return Object.assign({}, ...head.map( (k,i) => ({ [k]: rows.map(r => r[i]) }) ))
}

/* U:
let opts= {delimiter: '\t', colsAsArray: true}
let url='https://data.podemosaprender.org/finanzas/USD_BLUE_2023.csv'
let data= await fetch_csv(url, opts)
console.log(data)
*/



