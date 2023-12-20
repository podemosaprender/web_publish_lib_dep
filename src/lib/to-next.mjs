//INFO: Llevar ipynb y mdx al formato que necesita Next.
//CASOS:
//  * mipagina.mdx -> app/mipagina/page.mdx
//  * coso/mipagina.mdx -> app/coso/mipagina/page.mdx
//  * miinforme.ipynb -> app/miinforme/jupyter.html + page.js
//  * coso/hola.png + page.mdx -> app/coso/page.mdx + hola.png

//XXX: Metadata Google Collab
//  * Mejor caso: Front-Matter
//  * Sino: Buscar primer H1
//  * Otro caso: Parsear primer div que contiene primer h1 de Markdown

//XXX: PlantUML Suelto
/*
echo "BUILD plantuml"
curl -Lo plantuml.jar 'https://github.com/plantuml/plantuml/releases/download/v1.2023.12/plantuml-1.2023.12.jar'
java -jar plantuml.jar -o "$OUT_DIR" -tsvg -darkmode _build/test*.uml
*/

import {files} from './files.mjs'
import fs from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IPYNB_PAGE_TPL = fs.readFileSync(__dirname + "/../_ipynb_template.js");

//SEE: https://nodejs.org/docs/latest/api/process.html#process_process_argv
var args = process.argv.slice(2); 

let SRC_DIR = args[0];
let DST_DIR = args[1];
let DST_PUBLIC_DIR = args[2]; //XXX: Unused
console.log({SRC_DIR, DST_DIR, DST_PUBLIC_DIR})

async function mkDir(apath) {
    fs.mkdirSync(DST_DIR + "/" + apath, { recursive: true });
}

async function ipynbToHtml(apath, dst_folder) {
    let src_file = SRC_DIR + "/" + apath;
    let cmd = "jupyter nbconvert -y --output-dir="  + DST_DIR + "/" + dst_folder + " --to html --template=" + __dirname + "/../jupyter_tpl/lab --theme=dark --output jupyter.html $src_file"
    .replace("$src_file", src_file);

    console.log("ipynbToHtml", cmd);
    execSync(cmd);
}

async function ipynbPageTemplate(dst_folder) {
    fs.writeFileSync(DST_DIR + "/" + dst_folder + "/page.js", IPYNB_PAGE_TPL);
}

function YAMLFrontMatterToNextMetadata(markdown_src) {
    if (markdown_src.replace(/\s+/g, ' ').indexOf('export const metadata') > -1) {
        return markdown_src;
    }

    let metadata = matter(markdown_src).data || {};

    //DOC: Default title to first markdown header.
    metadata.title = metadata.title
        ? metadata.title 
        : (markdown_src.match(/^# (.+)$/m)||[])[1] || "Untitled"; 
    
    metadata.other = { blog_title: metadata.title } //XXX: Used to avoid conflict with Next title when showing post list.

    let next_metadata = "export const metadata = " + JSON.stringify(metadata);
    let src_no_front_matter = markdown_src.replace(/^---([\s\S]*?)---/, '');

    return next_metadata + "\n\n" + src_no_front_matter;
}

async function markdownCopyFile(apath, dst_folder) { 
    let mdx_data = fs.readFileSync(SRC_DIR + "/" + apath, 'utf-8');
    fs.writeFileSync(DST_DIR + "/" + dst_folder + "/page.mdx", YAMLFrontMatterToNextMetadata(mdx_data));
}

async function copyFile(apath, dst_folder, dst_name, isStatic) {
	let data = fs.readFileSync(SRC_DIR + "/" + apath, 'utf-8');
	fs.writeFileSync((isStatic ? DST_PUBLIC_DIR : DST_DIR) + "/" + dst_folder + "/" + dst_name, data);
}

async function processEntry(apath) {
	let src_path = SRC_DIR + "/" + apath;
	if (fs.statSync(src_path).isDirectory()) {
		mkDir(apath);
	} else {
		if (apath.endsWith(".ipynb")) {
			let carpeta = apath.replace(/(page)?\.\w+$/,''); mkDir(carpeta);
			console.log("Procesando ipynb", {apath, carpeta});
			ipynbToHtml(apath, carpeta);
			ipynbPageTemplate(carpeta);
		} else if (apath.match(/\.mdx?$/)) { 
			let carpeta = apath.replace(/(page)?\.\w+$/,''); mkDir(carpeta);
			console.log("Procesando mdx", {apath, carpeta});
			markdownCopyFile(apath, carpeta);
		} else if (apath.match(/\.js(x|on)$/)) { //A: js* files MUST be in a folder
			let carpeta = apath.replace(/[^\\\/]+$/,''); mkDir(carpeta);
			console.log("Procesando jsx", {apath, carpeta});
			copyFile(apath, carpeta,  apath.slice(carpeta.length));
		} else { //XXX:MUST go to public
			let carpeta = apath.replace(/[^\\\/]+$/,''); mkDir(carpeta);
			console.log("Procesando archivo", {apath, carpeta});
			copyFile(apath, carpeta, apath.slice(carpeta.length));
		}
	}
}

async function main() {
	let pfx_len= SRC_DIR.replace(/^\.+/,'').length
	//A: Glob returns path without ./ or ../ so we should slice a shortest prefix. 
	let userfiles = (await files(SRC_DIR, "*")) //A: Must filter later.
		.map(fn => fn.slice(pfx_len)) //A: Remove prefix //XXX: SRC_DIR.length-1 so it works with ./ or . for SRC_DIR
		.filter(fn => ! fn.match(/^(_build(\/.*)?)|(site(\/.*)?)|(_static(\/.*)?)|(README.md)$|(site.js)$/))
	//DBG: 
	console.log({userfiles});
	userfiles.forEach( processEntry );
}

main();
