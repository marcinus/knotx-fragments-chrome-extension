import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,900&display=swap');

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
    font-family: 'Lato', sans-serif;
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
  }

  .renderjson .disclosure {
    color: crimson;
  }

  .renderjson .syntax {
    color: grey;
  }

  .renderjson .string {
    color: red;
  }

  .renderjson .number {
    color: cyan;
  }

  .renderjson .boolean {
    color: plum;
  }

  .renderjson .key {
    color: lightblue;
  }

  .renderjson .keyword {
    color: lightgoldenrodyellow;
  }

  .renderjson .object.syntax {
    color: lightseagreen;
  }

  .renderjson .array.syntax {
    color: lightsalmon;
  }
`;
