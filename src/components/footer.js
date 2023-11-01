import { Link } from "@nextui-org/link";

//XXX:powerd by (link a tu plantilla en github)
export function Footer() {
	return (
		<footer className="w-full flex items-center justify-center py-3">
			<div className="flex items-center gap-1 text-current">

			<p>
				<Link isExternal href="https://maxiviamonte.com" title="Maxi Viamonte, make me a site like this">Maxi Viamonte</Link>
				<span className="text-default-600">, make me a site like this</span>
			</p>

			</div>

		</footer>   
	)
}
