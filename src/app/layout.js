import '@/styles/global.css'; //A: tailwind/NexUI styles
import {Providers} from "@/lib/providers";
//SEE: https://nextui.org/docs/frameworks/nextjs#add-provider-to-root

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
//SEE: https://fontawesome.com/v5/docs/web/use-with/react#getting-font-awesome-css-to-work

//FROM: npx create-next-app -e https://github.com/nextui-org/next-app-template
import { siteConfig } from "@/config/site"; //XXX:simplificar
import { fontSans } from "@/config/fonts";

import { Navbar } from "@/components/navbar";
import { Footer } from '@/components/footer';

import clsx from "clsx";

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: {
		default: siteConfig.description, 
		template: `%s`,
	},

	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],

	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

//XXX:META, og, head, etc.

export default function RootLayout({ children, }) {
	const basePath= process.env.basePath; //U: prefix, eg /mysite/

	// TEMPLATE_BEGIN
	return (
		<html lang={siteConfig.lang || "en"} suppressHydrationWarning>
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />

						<article className="prose prose-invert prose-img:mx-auto container w-full self-center mx-auto max-w-4xl items-center pt-16 px-5 flex-grow">
							{children}
						</article>

						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
	// TEMPLATE_END
}
