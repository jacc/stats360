// @ts-check

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
	content: ['./src/**/*.{tsx,ts,css}'],
	theme: {
		fontFamily: {
			sans: [
				"'Plus Jakarta Sans'",
				'-apple-system',
				'BlinkMacSystemFont',
				"'Segoe UI'",
				"'Roboto'",
				"'Oxygen'",
				"'Ubuntu'",
				"'Cantarell'",
				"'Fira Sans'",
				"'Droid Sans'",
				"'Helvetica Neue'",
				'sans-serif',
			],
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
