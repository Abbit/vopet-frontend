import { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
    vertical-align: baseline;
    background: transparent;
    font-family: 'Roboto', sans-serif;
  }
  
  body {
    min-height: 100vh;
    background-color: #f3f3f3;
    color: #1f1c1c;
  }
`;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
