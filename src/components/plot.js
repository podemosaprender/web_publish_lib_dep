//INFO: interactive plots, may be used with markdown
//SEE: https://plotly.com/javascript/react/
//SEE: https://plotly.com/javascript/reference/

"use client"
//A: plotly library requires client side rendering


import dynamic from 'next/dynamic';
export const Plot= dynamic(
	() => import('react-plotly.js'),
	{
		ssr: false,
		loading: () => <>Loading chart...</>,
	},
);

