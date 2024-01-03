/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				secondary: '#f5f6fa',

				// text colors
				darkText: '#222222',
				primaryText: '#555555',
				secondaryText: '#9e9ea7',
			},
			width: {
				sidebar: '280px',
				wrapper: 'calc(100% - 280px)',
				wrapperFull: '100%',
			},
			boxShadow: {
				input: '0 0 2px 1px #bfdbfe',
				textInput: '0 0 3px 0px #dadada57',
				selectListBox: '0 0 10px -3px #55555538',
				wrapperShadow: '0 0 6px 2px #3333330d',
				sidebarShadow: '0 0 6px 2px #3333330d',
				headerShadow: '6px 0 6px 2px #3333330d',
			},
		},
	},
	plugins: [],
};
