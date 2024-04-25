const {nextui} = require("@nextui-org/react");

//DBG: console.log("XXX tailwind config")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
  theme: {
    extend: {},
  },
	variants: {
		extend: {}
	},
	darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
    nextui(),
  ],
}

