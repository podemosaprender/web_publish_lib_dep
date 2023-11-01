import {fetch_txt} from '@/lib/fetch-data'

export const metadata = {
	title: "Google Collab Post",
	description: "Google Collab Post",
	other: {
	  author: "Post Author",
	  date: "31-10-2023",
	  blog_title: "Google Collab Post",
	}
};

export default async function Page() {
	let src= await fetch_txt(__dirname+'/jupyter.html')
	return (<div
      dangerouslySetInnerHTML={{__html: src}}
    />)
}