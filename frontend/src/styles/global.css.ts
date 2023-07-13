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
	button.gm-ui-hover-effect {
    visibility: hidden;
	}
	.gm-style-iw {
		box-shadow: 0 1px 6px rgba(178, 178, 178, 0.6);
		border: 1px solid rgba(72, 181, 233, 0.6);
		border-radius: 2px 2px 10px 10px;
	}
    `;

export default GlobalCSS;
