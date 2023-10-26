
"use client"

import React from "react";
import { useState, useEffect  } from "react";
import {Link} from "@nextui-org/react";

//A: the index is generated with npm run build
//A: process.env.basePath is configured in next.config.js

let siteData_;
async function getSitePostsData() {
	if(! siteData_) {
		let indexUrl=process.env.basePath+'/site-map.txt';
		try {
			siteData_ = JSON.parse((await fetch(indexUrl)).text());
		} catch (error) {
			console.log("[ERROR] Failed to read site-map.txt");
		}
	}
	return siteData_ ? siteData_ : [];
}

export function PostsList() {

	const [postsData, setPostsData]= useState([])

	let initSiteData = async (v) => {
		let res = await getSitePostsData();
		setPostsData(res);
	};

	useEffect(() => {
		initSiteData();
	}, []);

	return (
		<ul>
			{ postsData.map( postData => <li><Link href={postData.id}>{postData.title}</Link></li> ) }
		</ul>
	)
}