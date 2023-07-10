import { createGlobalStyle } from 'styled-components';

const GlobalCSS = createGlobalStyle`
	* {
		margin: 0;
		font-family: 'Nunito', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	p {
		font-family: 'Nunito', sans-serif !important;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}
    `;

export default GlobalCSS;
