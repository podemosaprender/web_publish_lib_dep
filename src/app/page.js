import { Search } from '@/components/search';
import { Suspense } from 'react';
import Link from 'next/link';
import { pages } from '@/lib/files';

//SEE: https://nextjs.org/docs/app/api-reference/functions/use-search-params
function SearchFallback() { 
	return <>Loading search box</>
}

export default async function Page() {
	return (<>
		<Suspense fallback={<SearchFallback />}>
			<Search />
		</Suspense>

		<h2>Pages</h2>
		<ul>
			{ (await pages(__dirname)).map( url => <li><Link href={process.env.basePath+url}>{url}</Link></li> ) }
		</ul>

	</>)
}
