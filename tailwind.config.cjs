const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss/defaultConfig')}  */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				marine: 'hsl(var(--clr-p-marine) / <alpha-value>)',
				purplish: 'hsl(var(--clr-p-purplish) / <alpha-value>)',
				pastel: 'hsl(var(--clr-p-pastel) / <alpha-value>)',
				light: 'hsl(var(--clr-p-light) / <alpha-value>)',
				straw: 'hsl(var(--clr-p-straw) / <alpha-value>)',
				ntrl: {
					1: 'hsl(var(--clr-n-1) / <alpha-value>)',
					2: 'hsl(var(--clr-n-2) / <alpha-value>)',
					3: 'hsl(var(--clr-n-3) / <alpha-value>)',
					4: 'hsl(var(--clr-n-4) / <alpha-value>)'
				}
			},
			fontFamily: {
				reg: [`'Ubuntu 400'`, 'sans-serif'],
				med: [`'Ubuntu 500'`, 'sans-serif'],
				bld: [`'Ubuntu 700'`, 'sans-serif']
			},
			screens: {
				mobile: { raw: '(width < 35em)' },
				desktop: { raw: '(width >= 35em)' },
				mbl: { raw: '(width < 35em)' },
				dsk: { raw: '(width >= 35em)' }
			}
		}
	},

	plugins: [
		plugin((api) => {
			api.addVariant('icl', '&:checked + label');
		})
	]
};

module.exports = config;
