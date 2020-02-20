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

import { DataSet } from 'vis-timeline';
import { constructTimeline } from './declarationHelper';
import * as mock from './declerationHelper.mock';

test('Timeline consists of vis datasets', () => {
  const { items, groups } = constructTimeline(mock.singleNode);

  expect(items).toBeInstanceOf(DataSet);
  expect(groups).toBeInstanceOf(DataSet);
});

test('Nested groups property is null when there are no subgroups', () => {
  const { groups } = constructTimeline(mock.singleNode);

  expect(groups.get()).toHaveLength(1);
  expect(groups.get()[0].nestedGroups).toBeNull();
});

test('Single node results in one timeline item and one group', () => {
  const expectedTimeline = {
    items: [
      {
        id: 'A',
        start: 12345,
        end: 54321,
        content: '',
        group: 'A label',
      },
    ],
    groups: [
      {
        id: 'A label',
        order: 0,
        content: 'A label',
        nestedGroups: null,
      },
    ],
  };

  const timeline = constructTimeline(mock.singleNode);

  expect(timeline.items.get()).toStrictEqual(expectedTimeline.items);
  expect(timeline.groups.get()).toStrictEqual(expectedTimeline.groups);
});

test('Group order is correct', () => {
  const timeline = constructTimeline(mock.singleNodeWithMultipleChildrenLevels);

  timeline.groups.get().forEach((group, i) => {
    expect(group).toHaveProperty('order', i);
  });
});

test('Processed child nodes are parsed', () => {
  const { items, groups } = constructTimeline(mock.singleNodeWithTransition);

  expect(items.get()).toHaveLength(2);
  expect(groups.get()).toHaveLength(2);
});

test('Composites produce timeline items based on subtasks with the composite as parent group', () => {
  const expectedTimeline = {
    items: [
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
    ],
    groups: [
      {
        id: 'A label',
        order: 0,
        content: 'A label',
        nestedGroups: ['A-A label', 'A-B label'],
      },
      {
        id: 'A-A label',
        order: 1,
        content: 'A-A label',
        nestedGroups: null,
      },
      {
        id: 'A-B label',
        order: 2,
        content: 'A-B label',
        nestedGroups: null,
      },
    ],
  };

  const timeline = constructTimeline(mock.compositeNode);

  expect(timeline.items.get()).toStrictEqual(expectedTimeline.items);
  expect(timeline.groups.get()).toStrictEqual(expectedTimeline.groups);
});

test('Nested composites create nested group information', () => {
  const expectedTimelineGroups = [
    {
      id: 'A label',
      order: 0,
      content: 'A label',
      nestedGroups: ['A-A label'],
    },
    {
      id: 'A-A label',
      order: 1,
      content: 'A-A label',
      nestedGroups: ['A-A-A label'],
    },
    {
      id: 'A-A-A label',
      order: 2,
      content: 'A-A-A label',
      nestedGroups: null,
    },
  ];

  const timeline = constructTimeline(mock.nestedCompositeNodes);

  expect(timeline.items.get()).toHaveLength(3);
  expect(timeline.groups.get()).toStrictEqual(expectedTimelineGroups);
});
