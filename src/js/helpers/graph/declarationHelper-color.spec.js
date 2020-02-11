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

import { constructGraph } from './declarationHelper';
import * as mock from './declarationHelper-color.mock';
import {
  COLOR_OTHER, COLOR_SUCCESS, COLOR_ERROR,
} from './drawingHelper';

test('Edges\' labels have proper colors', () => {
  const { edges } = constructGraph(mock.nodeWithAllTransitionTypes);
  const [successTransitionFont, errorTransitionFont, customTransitionFont] = edges.map((node) => node.font);

  expect(successTransitionFont).toHaveProperty('color', COLOR_SUCCESS);
  expect(errorTransitionFont).toHaveProperty('color', COLOR_ERROR);
  expect(customTransitionFont).toHaveProperty('color', COLOR_OTHER);
});
