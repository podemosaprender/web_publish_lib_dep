const withMDX = require('@next/mdx')()

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
 
module.exports = withMDX(nextConfig)
