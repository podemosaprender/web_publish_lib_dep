import { glob } from 'glob';
import fs from 'fs';

export async function files(basePath, filePattern) {
	let files= (await glob(basePath+'/**/'+(filePattern||'*')))
	return files;
}

export async function filesJSONData(basePath, filePattern)
{
	let filesDocs = (await files(basePath,filePattern))
	.filter( fn => fn.indexOf('404')==-1 )
	.map( fn => { 
		let src= fs.readFileSync(fn,'utf-8');
		let path= fn.slice('out'.length).replace(/[^\\\/]+\.html$/,'');
		return { 
			id: path,
			title: (src.match(/<title>([^<]*)/)||[])[1] || path,
			author: (src.match(/<meta\s+name="author"\s+content="([^"]*)"/)||[])[1] || '',
			date: (src.match(/<meta\s+name="date"\s+content="([^"]*)"/)||[])[1] || '',
			blog_title: (src.match(/<meta\s+name="blog_title"\s+content="([^"]*)"/)||[])[1] || '',
			body: src
				.replace(/<style[^>]*>.*?<\/style>/g,'')
				.replace(/<script[^>]*>.*?<\/script>/g,'')
				.replace(/\<[^\>]*\>/g,' ')
				.replace(/[\r\n\s]+/g,' ')
				.trim()
		}
	});
	return filesDocs;
}

export async function pages(basePath) {
	let r= (await files(basePath,'page.js'))
		.map(fp => ( fp
			.slice(basePath.length)
			.replace(/^.*?[\\\/]server[\\\/]app/,'')
			.replace(/page\.(([tj]s)|(md))x?$/,'')
		))
		.filter( p => p.length>1);
	return r;
}
