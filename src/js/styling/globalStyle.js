import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* NORMALIZE */
  body {
    margin: 0;
  }

  /* GLOBAL */
  #root {
    display: flex;
    overflow-y: hidden;
    overflow-x: hidden;
    height: 100vh;
  }

  /* JSON */
  pre.renderjson {
    font-size: 14px;
    height: 100%;
    overflow: scroll;
    margin: 0;
  }

  .renderjson a {
    text-decoration: none;
    color: #3FA7D6;
  }

  .renderjson .disclosure {
    color: #3FA7D6;
  }

  .renderjson .syntax {
    color: #707070;
  }

  .renderjson .string {
    color: #DE3C4B;
  }

  .renderjson .number {
    color: #59CD90;
  }

  .renderjson .boolean {
    color: #964BE5;
  }

  .renderjson .key {
    color: #87A9B5;
  }

  .renderjson .keyword {
    color: #E2799F;
  }

  .renderjson .object.syntax {
    color: #87A9B5;
  }

  .renderjson .array.syntax {
    color: #FAC05E;
  }
`;
