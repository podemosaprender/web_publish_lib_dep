
"use client"

import React from "react";
import { useState, useEffect  } from "react";
import {Link} from "@nextui-org/react";
import { ASCIItoUTF8 } from "@/lib/parse-data.mjs";

//A: the index is generated with npm run build
//A: process.env.basePath is configured in next.config.js

let sitesData_;
async function getSitePostsData() {
	if(! sitesData_) {
		let indexUrl=process.env.basePath+'/site-map.txt';
		try {
			sitesData_ = (await fetch(indexUrl)).json();
			//sitesData_ = sitesData_.filter(siteData => typeof siteData.blog_title === "string" && siteData.blog_title.length > 0);
		} catch (error) {
			console.log(error);
		}
	}
	return sitesData_ ? sitesData_ : [];
}


export function PostsList() {

	const [postsData, setPostsData]= useState([])

	let initSiteData = async (v) => {
		let res = await getSitePostsData();

		//XXX: Why are we getting &amp characters in site-map.txt?
		res = res.map(r => {
			if (r.blog_title) { 
				r.blog_title = ASCIItoUTF8(r.blog_title);
			}
			if (r.title) { 
				r.title = ASCIItoUTF8(r.title);
			}

			return r;
		});

		setPostsData(res);
	};

	useEffect(() => {
		initSiteData();
	}, []);

	return (
		<ul>
			{ postsData.map( postData => <li><Link href={process.env.basePath+postData.id}>{postData.blog_title ? postData.blog_title : postData.title}</Link></li> ) }
		</ul>
	)
}