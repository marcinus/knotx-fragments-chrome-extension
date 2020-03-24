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

import { SET_PAGE_DATA, REMOVE_PAGE_DATA, SET_RENDERED_GRAPH } from '../actionTypes/pageData';

import { setPageData, removePageData, setRenderedGraph } from './pageData';

test('Validate setPageData type.', () => {
  const pageData = {};
  const result = setPageData(pageData);

  expect(result.type).toBe(SET_PAGE_DATA);
  expect(result.pageData).toBe(pageData);
});

test('Validate removePageData type.', () => {
  const pageData = {};
  const result = removePageData(pageData);

  expect(result.type).toBe(REMOVE_PAGE_DATA);
  expect(result.pageData).toBe(pageData);
});

test('Validate setRenderedGraph type.', () => {
  const pageData = {};
  const result = setRenderedGraph(pageData);

  expect(result.type).toBe(SET_RENDERED_GRAPH);
  expect(result.pageData).toBe(pageData);
});
