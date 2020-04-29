/*
 * Copyright (C) 2020 Knot.x Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* NORMALIZE */
  body {
    margin: 0;
  }

  #popup {
    width: 150px;
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

    &::-webkit-scrollbar {
      display: none;
    }
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
