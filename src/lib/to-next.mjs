//INFO: Llevar ipynb y mdx al formato que necesita Next.
//CASOS:
//  * mipagina.mdx -> app/mipagina/page.mdx
//  * coso/mipagina.mdx -> app/coso/mipagina/page.mdx
//  * miinforme.ipynb -> app/miinforme/jupyter.html + page.js
//  * coso/hola.png + page.mdx -> app/coso/page.mdx + hola.png

import {files} from './files.mjs'
import fs from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IPYNB_PAGE_TPL = fs.readFileSync(__dirname + "/../_ipynb_template.js");

let SRC_DIR = "c:/Users/Maira/Desktop/Maxi/Trabajo/PodemosAprender/Sitio/publish_on_gitpages_tpl" //XXX: Solo para test
let DST_DIR = "./xnext" //U: Source files for Next //XXX: Solo para test

async function mkDir(apath) {
    fs.mkdirSync(DST_DIR + "/" + apath, { recursive: true });
}

async function ipynbToHtml(apath, dst_folder) {
    let src_file = SRC_DIR + "/" + apath;
    let cmd = "jupyter nbconvert -y --output-dir="  + DST_DIR + "/" + dst_folder + " --to html --template=" + __dirname + "/../jupyter_tpl --theme=dark --output jupyter.html $src_file"
    .replace("$src_file", src_file);

    console.log("ipynbToHtml", cmd);
    //execSync(cmd);
}
async function ipynbPageTemplate(carpeta) {
    fs.writeFileSync(DST_DIR + "/" + carpeta + "/page.js", IPYNB_PAGE_TPL);
}

async function processEntry(apath) {
    let src_path = SRC_DIR + "/" + apath;
    if (fs.statSync(src_path).isDirectory()) {
        mkDir(apath);
    } else {
        if (apath.endsWith(".ipynb")) {
            let carpeta = apath.endsWith("page.ipynb")
                ? apath.replace("page.ipynb", "")
                : apath.replace(".ipynb", ""); 
            console.log("Procesando ipynb", {apath, carpeta});
            mkDir(carpeta);
            ipynbToHtml(apath, carpeta);
            ipynbPageTemplate(carpeta);
        }
    }
}

async function main() {
    let userfiles = (await files(SRC_DIR, "*")) //A: Must filter later.
        .map(fn => fn.slice(SRC_DIR.length+1)) //A: Remove prefix
        .filter(fn => fn.indexOf("_build") == -1)
    //DBG: console.log({userfiles});
    userfiles.forEach( processEntry );
}

main();