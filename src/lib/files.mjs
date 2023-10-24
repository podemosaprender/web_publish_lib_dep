import { glob } from 'glob';

export async function files(basePath, filePattern) {
	let files= (await glob(basePath+'/**/'+(filePattern||'*')))
	return files;
}

export async function pages(basePath) {
	let r= (await files(basePath,'page.js'))
		.map(fp => ( fp
			.slice(basePath.length-1)
			.replace(/^.*?[\\\/]server[\\\/]app/,'')
			.replace(/page\.(([tj]s)|(md))x?$/,'')
		))
		.filter( p => p.length>1);
	return r;
}
