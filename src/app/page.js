import { Search } from '@/components/search';
import { Suspense } from 'react';
import Link from 'next/link';
import { pages } from '@/lib/files';
import { PostsList } from 'components/PostsList';

//SEE: https://nextjs.org/docs/app/api-reference/functions/use-search-params
function SearchFallback() { 
	return <>Loading search box</>
}

function LoadingFallback() {
	return <p>Loading Data...</p>;
}

export default async function Page() {
	//SEE: https://nextjs.org/docs/app/api-reference/next-config-js/basePath#links

	return (<>
		<Suspense fallback={<SearchFallback />}>
			<Search />
		</Suspense>

		<h2>Pages</h2>
		<Suspense fallback={<LoadingFallback />}>
			<PostsList />
		</Suspense>

	</>)
}
