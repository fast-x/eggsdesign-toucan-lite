import { createGlobalStyle } from 'styled-components';
import { bodyFont, tokens } from './variables';
// import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    padding: env(safe-area-inset);
    background-color: ${tokens.colors.indigo[100].value};
    :before {
      content: '';
      position: fixed;
      width: 100%;
      height: 999px;
      top: -999px;
      background-color: white;
      margin-top: -999px;
      z-index: -1;
    }
  }

  body {
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
    font-family: ${bodyFont};
    font-feature-settings: 'ss01', 'ss05';
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: normal;
  }
  h2 {margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 1rem;
    max-width: 600px;
    line-height: 1.5rem;
  }
  a {
    color: inherit;
    text-decoration: underline;
  }
  .ReactModal__Overlay--after-open {
    z-index: 40;
    background-color: rgba(0, 0, 0, 0.7) !important;
  
  }
  // Override React modal
  .ReactModal__Content {
    position: relative !important;
  }
  .ReactModal__Content--after-open {
    @media (max-width: 767px) {
      bottom: 0 !important;
      top: auto !important;
      left: auto !important;
      transform: translate(0, 0) !important;
      inset: 0 !important;
      width: 100% !important;  
    }
  }
`;
