//INFO: a client side search component
'use client'

import React from "react";
import { useState } from "react";

import {Link, Button, Input} from "@nextui-org/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import lunr from 'lunr'

//A: the index is generated with npm run build
//A: process.env.basePath is configured in next.config.js
let searchIdx_;
async function searchIdx(v) {
	v= (v||'').trim()
	if (v=='') return [];

	if(! searchIdx_) {
		let indexUrl=process.env.basePath+'/search-idx.txt';
		console.log("SEARCH load", indexUrl);
		searchIdx_ = lunr.Index.load(
			await fetch(indexUrl).then(res => res.json())
		)
	}
	return searchIdx_.search(v);
}

export function Search() {
	const [searchResults, setSearchResults]= useState([])

	return (<div>
		<Input
			classNames={{
				base: "max-w-full sm:max-w-[10rem] h-10",
				mainWrapper: "h-full",
				input: "text-small",
				inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
			}}
			placeholder="Type to search..."
			size="sm"
			startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
			type="search"
			onValueChange={async (v) => { 
				let r= await searchIdx(v)
				console.log("SEARCH onValueChange",v, r)  
				setSearchResults(r);
			} }
		/>
		<div>
			{ setSearchResults.length<1 ? 'no results' : (<>
			<p>Results</p>	
			<ul>
				{ searchResults.map( e => <li><Link href={process.env.basePath+e.ref}>{ e.ref }</Link></li> ) }
			</ul>
			</>)}
		</div>
	</div>)
}

