import '@/styles/global.css'; //A: tailwind/NexUI styles
//SEE: https://nextui.org/docs/frameworks/nextjs#add-provider-to-root
import {Providers} from "@/lib/providers";

//FROM: npx create-next-app -e https://github.com/nextui-org/next-app-template
import { siteConfig } from "@/config/site"; //XXX:simplificar
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

import { Metadata } from "next";
import clsx from "clsx";
import Footer from '@/components/Footer';

export const metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description, themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};
//		<script src="https://cdn.tailwindcss.com?plugins=typography"></script> 
//						<article className="prose prose-invert prose-pre:flex prose-pre:justify-center prose-code:w-full container w-full self-center mx-auto max-w-4xl items-center pt-16 px-5 flex-grow">

export default function RootLayout({ children, }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
			<link rel="stylesheet" href="https://unpkg.com/@tailwindcss/typography@0.5.x/dist/typography.min.css" />
			</head>
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<article className="prose prose-invert container w-full self-center mx-auto max-w-4xl items-center pt-16 px-5 flex-grow">
							{children}
						</article>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
