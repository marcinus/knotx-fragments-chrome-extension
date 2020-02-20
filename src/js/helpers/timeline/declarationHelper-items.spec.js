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

import { createTimelineItems, getGraphWithUniqueLabels, generateUniqueLabel } from './declarationHelper';
import * as mock from './declerationHelper.mock';

test('Unique labels are generated as is by default', () => {
  expect(generateUniqueLabel('Test', {})).toBe('Test');
  expect(generateUniqueLabel('Another test', {})).toBe('Another test');
});

test('Unique labels are numerated if needed', () => {
  const takenLabels = {};

  expect(generateUniqueLabel('Test', takenLabels)).toBe('Test');
  expect(generateUniqueLabel('Test', takenLabels)).toBe('Test (#2)');
  expect(generateUniqueLabel('Test', takenLabels)).toBe('Test (#3)');
});

test('Single node generates one timeline item', () => {
  const expectedItem = {
    id: 'A',
    start: 12345,
    end: 54321,
    content: '',
    group: 'A label',
  };

  const mockedNode = getGraphWithUniqueLabels(mock.singleNode);

  expect(createTimelineItems(mockedNode)).toStrictEqual([expectedItem]);
});

test('Node transitions are ignored', () => {
  const expectedItem = {
    id: 'A',
    start: 12345,
    end: 54321,
    content: '',
    group: 'A label',
  };

  const mockedNode = getGraphWithUniqueLabels(mock.singleNodeWithTransition);

  expect(createTimelineItems(mockedNode)).toStrictEqual([expectedItem]);
});

test('Composite node generates multiple timeline items with subgroup information', () => {
  const expectedItems = [
    {
      id: 'A',
      start: 12345,
      end: 54321,
      content: '',
      group: 'A label',
    },
    {
      id: 'A-A',
      start: 12345,
      end: 54321,
      content: '',
      group: 'A-A label',
      subgroupOf: 'A label',
    },
    {
      id: 'A-B',
      start: 12345,
      end: 20000,
      content: '',
      group: 'A-B label',
      subgroupOf: 'A label',
    },
  ];

  const mockedNode = getGraphWithUniqueLabels(mock.compositeNode);

  expect(createTimelineItems(mockedNode)).toStrictEqual(expectedItems);
});

test('All subtask nodes are parsed into timeline items with composite as parent group', () => {
  const expectedItems = [
    {
      id: 'A',
      start: 12345,
      end: 54321,
      content: '',
      group: 'A label',
    },
    {
      id: 'A-A',
      start: 12345,
      end: 30000,
      content: '',
      group: 'A-A label',
      subgroupOf: 'A label',
    },
    {
      id: 'A-AA',
      start: 30000,
      end: 54321,
      content: '',
      group: 'A-AA label',
      subgroupOf: 'A label',
    },
  ];

  const mockedNode = getGraphWithUniqueLabels(mock.compositeNodeWithSubtaskTransitions);

  expect(createTimelineItems(mockedNode)).toStrictEqual(expectedItems);
});

test('Composites without subtasks are parsed correctly', () => {
  const expectedItem = {
    id: 'A',
    start: 12345,
    end: 54321,
    content: '',
    group: 'A label',
  };

  const mockedNode = getGraphWithUniqueLabels(mock.compositeNodeWithoutSubtasks);

  expect(createTimelineItems(mockedNode)).toStrictEqual([expectedItem]);
});

test('Nested composites result in nested groups information', () => {
  const expectedItems = [
    {
      id: 'A',
      start: 12345,
      end: 54321,
      content: '',
      group: 'A label',
    },
    {
      id: 'A-A',
      start: 12345,
      end: 54321,
      content: '',
      group: 'A-A label',
      subgroupOf: 'A label',
    },
    {
      id: 'A-A-A',
      start: 12345,
      end: 54321,
      content: '',
      group: 'A-A-A label',
      subgroupOf: 'A-A label',
    },
  ];

  const mockedNode = getGraphWithUniqueLabels(mock.nestedCompositeNodes);

  expect(createTimelineItems(mockedNode)).toStrictEqual(expectedItems);
});
