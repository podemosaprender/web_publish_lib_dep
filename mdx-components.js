//INFO: Allows customizing built-in components, e.g. to add styling.
//SEE: https://nextjs.org/docs/pages/building-your-application/configuring/mdx#custom-elements
 
export function useMDXComponents(components) {
  return {
		/// img: (params) => { console.log(params); return <pre>{params}</pre>	},
    ...components,
  }
}
