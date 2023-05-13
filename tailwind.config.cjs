/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			important: true,
			fontFamily: {
				courrierprime: ['Courrier Prime']
			},
			backgroundImage: {
				'hero': "url('./assets/img/clouds_pink.jpg')",
			}
		},
	},
	plugins: [...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()],
}
