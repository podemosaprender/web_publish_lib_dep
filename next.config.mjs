import remarkGfm from 'remark-gfm'
import rehypePlantUml from './src/lib/rehype-plantuml.mjs'
import rehypePrettyCode from 'rehype-pretty-code'
import createMDX from '@next/mdx'

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
	//grid: false,
	theme: 'one-dark-pro',
};


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
			rehypePlantUml,
			[rehypePrettyCode, rehypePrettyCodeOptions],
		],
  },
})

export default withMDX(nextConfig)