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

import { extractGroupData, reduceSubgroups } from './declarationHelper';

test('Group with parent information is correctly transform into group with subgroups information', () => {
  const alreadyReducedData = { parentName: [] };
  const currentData = { group: 'childName', subgroupOf: 'parentName' };
  const expectedData = { parentName: ['childName'], childName: [] };

  expect(reduceSubgroups(alreadyReducedData, currentData)).toStrictEqual(expectedData);
});

test('Reducing subgroups works correctly with some groups already processed', () => {
  const alreadyReducedData = { group1: ['group3'], group2: [], group3: [] };
  const currentData = { group: 'group4', subgroupOf: 'group1' };
  const expectedData = {
    group1: ['group3', 'group4'], group2: [], group3: [], group4: [],
  };

  expect(reduceSubgroups(alreadyReducedData, currentData)).toStrictEqual(expectedData);
});

test('Parse group data as is without subgroups', () => {
  const groupItems = [
    { group: 'A' },
    { group: 'B' },
    { group: 'C' },
  ];

  const expectedGroupData = [
    { name: 'A', subgroups: [] },
    { name: 'B', subgroups: [] },
    { name: 'C', subgroups: [] },
  ];

  expect(extractGroupData(groupItems)).toStrictEqual(expectedGroupData);
});

test('Flatten subgroups and keep ids in parent', () => {
  const groupItems = [
    { group: 'A' },
    { group: 'B' },
    { group: 'A-1', subgroupOf: 'A' },
    { group: 'B-1', subgroupOf: 'B' },
    { group: 'B-2', subgroupOf: 'B' },
  ];

  const expectedGroupData = [
    { name: 'A', subgroups: ['A-1'] },
    { name: 'B', subgroups: ['B-1', 'B-2'] },
    { name: 'A-1', subgroups: [] },
    { name: 'B-1', subgroups: [] },
    { name: 'B-2', subgroups: [] },
  ];

  expect(extractGroupData(groupItems)).toStrictEqual(expectedGroupData);
});

test('Correctly flatten nested groups', () => {
  const groupItems = [
    { group: 'A' },
    { group: 'B' },
    { group: 'B-1', subgroupOf: 'B' },
    { group: 'B-1-I', subgroupOf: 'B-1' },
    { group: 'B-1-II', subgroupOf: 'B-1' },
  ];

  const expectedGroupData = [
    { name: 'A', subgroups: [] },
    { name: 'B', subgroups: ['B-1'] },
    { name: 'B-1', subgroups: ['B-1-I', 'B-1-II'] },
    { name: 'B-1-I', subgroups: [] },
    { name: 'B-1-II', subgroups: [] },
  ];

  expect(extractGroupData(groupItems)).toStrictEqual(expectedGroupData);
});
