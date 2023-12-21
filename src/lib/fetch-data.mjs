//INFO: read data for SSG from urls or local files
import { parse as csv_parse } from 'csv-parse/sync'
import slugify from 'slugify';
import fs from 'fs'

export function slug_add_to_array_of_kv(array_of_kv, slugCols) {
	let cols= Array.isArray(slugCols) ? slugCols : slugCols.split(/;/);
	array_of_kv.forEach( r => { r.slug= slugify( cols.map( c => r[c] ).join(' '), { lower: true })}) //SEE: https://www.npmjs.com/package/slugify
	return array_of_kv;
}

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
	/* U:
	//SEE: https://csv.js.org/parse/options/
	let opts= {delimiter: '\t', colsAsArray: true}
	let url='https://data.podemosaprender.org/finanzas/USD_BLUE_2023.csv'
	let data= await fetch_csv(url, opts)
	console.log(data)

	opts2= {
		delimiter: ';',
		record_delimiter: '\n\r', //U: solo pasar este parametro si falla autodetect //SEE: https://csv.js.org/parse/options/record_delimiter/
  	columns: true,
  	skip_empty_lines: true,
	}
	*/	
	let rows= csv_parse(await fetch_txt(url), opts) 
	if (!opts.colsAsArray) { return rows }

	let head= rows.shift()
	return Object.assign({}, ...head.map( (k,i) => ({ [k]: rows.map(r => r[i]) }) ))
}

export async function fetch_data(url, opts) { //U: single entry point for csv and json
	let r= (opts.type=='json') ? await fetch_json(url) : await fetch_csv(url, opts);
	if (opts.slugCols) { r= slug_add_to_array_of_kv(r, opts.slugCols) }
	if (opts.map) { r= r.map(r => opts.map(r, opts, url)) }
	return r;
}

export function mk_params(url, opts) { //U: export const generateStaticParams= mk_params(url, opts)
	return async function generateStaticParams() {
		return await fetch_data(url, opts);
	}
}
