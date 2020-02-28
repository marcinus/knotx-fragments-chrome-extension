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

import { constructGraph, getNodeGroup } from './declarationHelper';
import * as mock from './declarationHelper-group.mock';

test('Single nodes belong to proper groups', () => {
  const { nodes: successNodes } = constructGraph(mock.successNode);
  const { nodes: errorNodes } = constructGraph(mock.errorNode);
  const { nodes: missingNodes } = constructGraph(mock.missingNode);
  const { nodes: unprocessedNodes } = constructGraph(mock.unprocessedNode);
  const { nodes: otherNodes } = constructGraph(mock.otherNode);

  expect(successNodes).toHaveLength(1);
  expect(successNodes[0]).toHaveProperty('group', 'success');

  expect(errorNodes).toHaveLength(1);
  expect(errorNodes[0]).toHaveProperty('group', 'error');

  expect(missingNodes).toHaveLength(1);
  expect(missingNodes[0]).toHaveProperty('group', 'missing');

  expect(unprocessedNodes).toHaveLength(1);
  expect(unprocessedNodes[0]).toHaveProperty('group', 'unprocessed');

  expect(otherNodes).toHaveLength(1);
  expect(otherNodes[0]).toHaveProperty('group', 'other');
});

test('Composite nodes belong to proper groups', () => {
  const { nodes: successNodes } = constructGraph(mock.successCompositeNode);
  const { nodes: errorNodes } = constructGraph(mock.errorCompositeNode);
  const { nodes: unprocessedNodes } = constructGraph(mock.unprocessedCompositeNode);

  expect(successNodes).toHaveLength(3);
  expect(successNodes[0]).toHaveProperty('group', 'virtual');
  expect(successNodes[2]).toHaveProperty('group', 'virtual_success');

  expect(errorNodes).toHaveLength(3);
  expect(errorNodes[0]).toHaveProperty('group', 'virtual');
  expect(errorNodes[2]).toHaveProperty('group', 'virtual_error');

  expect(unprocessedNodes).toHaveLength(3);
  expect(unprocessedNodes[0]).toHaveProperty('group', 'virtual');
  expect(unprocessedNodes[2]).toHaveProperty('group', 'virtual_unprocessed');
});

test('Group name is always lowercase', () => {
  expect(getNodeGroup({ status: 'SUCCESS' })).toBe('success');
  expect(getNodeGroup({ status: 'ERROR' })).toBe('error');
  expect(getNodeGroup({ status: 'MISSING' })).toBe('missing');
  expect(getNodeGroup({ status: 'UNPROCESSED' })).toBe('unprocessed');
  expect(getNodeGroup({ status: 'OTHER' })).toBe('other');

  expect(getNodeGroup({ type: 'virtual_end', status: 'SUCCESS' })).toBe('virtual_success');
  expect(getNodeGroup({ type: 'virtual_end', status: 'ERROR' })).toBe('virtual_error');
  expect(getNodeGroup({ type: 'virtual_end', status: 'UNPROCESSED' })).toBe('virtual_unprocessed');
});
