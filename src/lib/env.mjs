//INFO: environment data to use in pages

export const BasePath= (process.env.GITHUB_REPOSITORY||'').replace(/^[^\/]*/,'') 
//eg: "/nextjs-github-pages"
