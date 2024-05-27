import remarkGfm from 'remark-gfm'
import rehypePlantUml from './src/lib/rehype-plantuml.mjs'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import createMDX from '@next/mdx'

import { BasePath } from './src/lib/env.mjs';

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

  basePath: BasePath,
  //SEE: https://nextjs.org/docs/app/api-reference/next-config-js/basePath

  env: { //A: available client side SEE: https://nextjs.org/docs/pages/api-reference/next-config-js/env
    basePath: BasePath,
  },

  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  //A: Configure `pageExtensions`` to include MDX files

  trailingSlash: true, 
  //A: Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`

  // skipTrailingSlashRedirect: true,
  //A: Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`

  //SEE: https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
  images: {
    unoptimized: true,
  },

  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    //config.optimization.minimize= false;

    process.env.DBG && console.log("XXX webpack config", config, JSON.stringify(config,(key, value) => (
      typeof value === 'bigint'
        ? value.toString()
        : value 
    ),2))
    return config	//A: Important: return the modified config
  },
  //SEE: https://nextjs.org/docs/app/api-reference/next-config-js/webpack
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
      rehypeSlug,
      [rehypeAutolinkHeadings, {behavior: 'wrap'}],
    ],
  },
})

export default withMDX(nextConfig)
