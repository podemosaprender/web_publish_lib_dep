import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import createMDX from '@next/mdx'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',

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
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrettyCode],
  },
})

export default withMDX(nextConfig)
