import {fetch_txt} from '@/lib/fetch-data'

export default async function Page() {
	let src= await fetch_txt(__dirname+'/jupyter.html')
	return (<div
      dangerouslySetInnerHTML={{__html: src}}
    />)
}