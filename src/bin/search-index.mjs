import lunr from 'lunr'
import {filesJSONData} from '../lib/files.mjs'
import fs from 'fs';

async function build_index() {
	let docs = await filesJSONData('./out', '*.html');

	var idx = lunr(function () {
		this.ref('id');
		this.field('title');
		this.field('body');
		this.field('author');
		this.field('date');
		this.field('blog_title');

		docs.forEach(function (doc) { this.add(doc) }, this);
	})
	
	fs.writeFileSync('./out/search-idx.txt', JSON.stringify(idx));
	fs.writeFileSync('./out/site-map.txt', JSON.stringify(docs.map(({body, ...keepAttrs}) => keepAttrs)));
}

build_index();
