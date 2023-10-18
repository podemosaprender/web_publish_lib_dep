import plantumlEncoder from 'plantuml-encoder';
import {VFile} from "vfile";

import {rehype} from 'rehype';

import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'
const rehypeX = unified().use(rehypeParse).use(rehypeStringify).freeze()
//A: Create a new unified processor that already uses `rehype-parse` and * `rehype-stringify`.

const DEFAULT_OPTIONS = {
  baseUrl: "https://www.plantuml.com/plantuml/svg"
};

let CNT=0;
async function parseSVG(contents) {
  let file = new VFile({
    contents: contents,
    path: 'UML_'+(CNT++),
  });

	let processor= unified().use(rehypeParse, { fragment: true, space: "svg" }).use(rehypeStringify).freeze()
  let rootNode = await processor.parse(contents)
	//A: Parse the SVG content to a HAST tree
	
  for (let child of rootNode.children) {
		console.log("XXX",child)
    if (child.tagName=='svg') {
      return child;
    }
  }
	//A: Find the <svg> child node

  throw new Error(`Error parsing SVG image: Unable to find the root <svg> element.`);
}

async function xfrmPlantUMLNode(node, opts) {
	//DBG: console.log("xfrmPlantUMLNode",{opts, node});
	/*
	 NODE {
		type: 'element',
		tagName: 'code',
		properties: { className: [ 'language-plantuml' ] },
		children: [
			{
				type: 'text',
				value: 'class SimplePlantUMLPlugin {\n    + transform(syntaxTree: AST): AST\n}\n'
			}
		],
		data: { meta: 'Your title' },
		position: {
			start: { line: 30, column: 1, offset: 419 },
			end: { line: 34, column: 4, offset: 514 }
		}
	}
	*/
	if (node.tagName=='code' && node.properties?.className?.indexOf('language-plantuml')>-1) {
		console.log("xfrmPlantUMLNode",node)
		let src= node.children[0].value;
    let url = `${opts.baseUrl.replace(/\/$/, "")}/${plantumlEncoder.encode(src)}`;
		//console.log("xfrmPlantUMLNode",{url, src});
		//Stradex: adding a try-catch to ensure that we will always get a SVG element, even if it is a failed one.
		//			To avoid issues with github actions and the fetch() method.
		let res;
		try {
			res = await fetch(url).then(r => r.text());
		} catch (error) {
			res=`<svg height="100" width="100"> <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /> Sorry, your browser does not support inline SVG.  </svg>`;
		} 

		Object.assign(node, await parseSVG(res))
	} else if (node.children) { 
		await Promise.all( node.children.map( n => xfrmPlantUMLNode(n, opts)) ) }
}

export default function inlinePlantUMLSVG(options) {
	let opts= Object.assign({}, DEFAULT_OPTIONS, options || {})
	//DBG: console.log("O",opts);
  return async function transformer(tree, file) {
		//DBG console.log("inlinePlantUMLSVG transformer", tree)
		await xfrmPlantUMLNode(tree, opts)
		return tree;
	}
}
