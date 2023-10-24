import lunr from 'lunr'
import {files} from '../lib/files.mjs'
import fs from 'fs'

async function build_index() {
	let docs= (await files('./out','*.html'))
		.filter( fn => fn.indexOf('404')==-1 )
		.map( fn => { 
			let src= fs.readFileSync(fn,'utf-8');
			let path= fn.slice('./out'.length-1).replace(/[^\/]+\.html$/,'') 
			return { 
				id: path,
				title: (src.match(/<title>([^<]*)/)||[])[1] || path,
				body: src
					.replace(/<style[^>]*>.*?<\/style>/g,'')
					.replace(/<script[^>]*>.*?<\/script>/g,'')
					.replace(/\<[^\>]*\>/g,' ')
					.replace(/[\r\n\s]+/g,' ')
					.trim()
			}
		})
	//DBG: console.log("docs",docs);

	var idx = lunr(function () {
		this.ref('id')
		this.field('title')
		this.field('body')
		
		docs.forEach(function (doc) { this.add(doc) }, this)
	})
	
	fs.writeFileSync('./out/search-idx.txt', JSON.stringify(idx))
}

build_index();
