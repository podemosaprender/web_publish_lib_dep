import {fetch_txt} from '@/lib/fetch-data'

let siteSrc_;
async function getJupyterSiteSrc(apath) {
	if (apath=='') return [];
	if(! siteSrc_) {
		siteSrc_ = await fetch_txt(apath);
	}
	return siteSrc_;
}

export default async function Page() {
	let src= await getJupyterSiteSrc(__dirname+'/jupyter.html')
	return (<div
      dangerouslySetInnerHTML={{__html: src}}
    />)
}