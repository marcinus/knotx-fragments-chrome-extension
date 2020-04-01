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

import {
  hasTransitions, isComposite, hasProcessedTransitions, hasPreDefinedTransitions,
} from './nodeRecognitionHelper';

test('Node transision existance is correctly identified', () => {
  expect(hasTransitions({})).toBeFalse();
  expect(hasTransitions({ on: {} })).toBeFalse();
  expect(hasTransitions({ on: { _success: {} } })).toBeTrue();
});

test('Node processed transition existance is correctly identified', () => {
  expect(hasProcessedTransitions({})).toBeFalse();
  expect(hasProcessedTransitions({ on: {} })).toBeFalse();
  expect(hasProcessedTransitions({ on: { _success: { status: 'UNPROCESSED' } } })).toBeFalse();
  expect(hasProcessedTransitions({ on: { _success: { status: 'SUCCESS' } } })).toBeTrue();
});

test('Node predefined transition existance is correctly identified', () => {
  expect(hasPreDefinedTransitions({})).toBeFalse();
  expect(hasPreDefinedTransitions({ on: {} })).toBeFalse();
  expect(hasPreDefinedTransitions({ on: { custom: {} } })).toBeFalse();
  expect(hasPreDefinedTransitions({ on: { _success: {} } })).toBeFalse();
  expect(hasPreDefinedTransitions({ on: { _error: {} } })).toBeFalse();
  expect(hasPreDefinedTransitions({ on: { _success: {}, _error: {} } })).toBeTrue();
});

test('Composites are correctly identified', () => {
  const lowercaseComposite = { type: 'composite' };
  const uppercaseComposite = { type: 'COMPOSITE' };
  const lowercaseSingle = { type: 'single' };
  const uppercaseSingle = { type: 'SINGLE' };

  expect(isComposite(lowercaseComposite)).toBeTrue();
  expect(isComposite(uppercaseComposite)).toBeTrue();
  expect(isComposite(lowercaseSingle)).toBeFalse();
  expect(isComposite(uppercaseSingle)).toBeFalse();
});
