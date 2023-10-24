import Link from 'next/link';
import { pages } from '@/lib/files';

export default async function Page() {
	return (<ul>
		{ (await pages(__dirname)).map( url => <li><Link href={url}>{url}</Link></li> ) }
	</ul>)
}
