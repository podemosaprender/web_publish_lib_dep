import remarkGfm from 'remark-gfm'
//Stradex: disabling rehypePlantUml just for testing
//import rehypePlantUml from './src/lib/rehype-plantuml.mjs'
import rehypePrettyCode from 'rehype-pretty-code'
import createMDX from '@next/mdx'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',

	basePath: (process.env.GITHUB_REPOSITORY||'').replace(/^[^\/]*/,''), //ej: "/nextjs-github-pages",
	//SEE: https://nextjs.org/docs/app/api-reference/next-config-js/basePath

  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
	//A: Configure `pageExtensions`` to include MDX files

	trailingSlash: true, 
	//A: Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
 
  // skipTrailingSlashRedirect: true,
	//A: Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [
			remarkGfm, 
		],
    rehypePlugins: [
//Stradex: Disabling rehypePlantUml just for testing
//			rehypePlantUml,
			rehypePrettyCode,
		],
  },
})

export default withMDX(nextConfig)
