import { fetch_csv, fetch_json } from '@/lib/fetch-data'
import { Plot } from './plot';

export const PlotUrl= async ({url, opts, dataFun, layout}) => {
	let dsrc= (opts?.fmt=='csv' || opts?.delimiter!=null || url.endsWith('.csv')) 
		? await fetch_csv(url, {...opts, colsAsArray: true})
		: await fetch_json(url);
	console.log("PlotUrl dsrc", dsrc)
	let data= (typeof(dataFun)=='function') ? dataFun(dsrc, opts) : dsrc;
	console.log("PlotUrl data", data)
	return (<Plot data={data} layout={layout} />)
}
