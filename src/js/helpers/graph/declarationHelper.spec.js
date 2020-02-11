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

import { constructGraph, flattenComposites } from './declarationHelper';
import * as mock from './declarationHelper.mock';
import {
  COLOR_OTHER, COLOR_SUCCESS, COLOR_ERROR, COLOR_DEFAULT_EDGE, COLOR_UNPROCESSED_EDGE,
} from './drawingHelper';

/* eslint-disable no-underscore-dangle */

const createNode = (id, label, group, level) => ({
  id, label, group, level,
});

const createEdge = (from, to, unprocessed = false, label = '', fontColor = COLOR_OTHER) => ({
  from,
  to,
  label,
  dashes: unprocessed,
  font: {
    color: fontColor,
  },
  color: unprocessed ? COLOR_UNPROCESSED_EDGE : COLOR_DEFAULT_EDGE,
});

// ************************
// graph flattening tests
// ************************

test('Single node is left as is when flattened', () => {
  const flattenedGraph = flattenComposites(mock.singleNode);

  expect(flattenedGraph).toStrictEqual(mock.singleNode);
});

test('Composite node is flattened into two virtual nodes with subtasks in-between', () => {
  const flattenedGraph = flattenComposites(mock.compositeNode);

  expect(flattenedGraph.id).toBe('A_virtual');
  expect(Object.keys(flattenedGraph.on)).toStrictEqual(['_subtask_0']);

  const { _subtask_0: subtask } = flattenedGraph.on;

  expect(subtask.id).toBe('A-A');
  expect(Object.keys(subtask.on)).toStrictEqual(['_subtask_end']);

  const { _subtask_end: end } = subtask.on;

  expect(end.id).toBe('A_virtual2');
  expect(end.on).toBeUndefined();
});

/**
 * Only the (first) deepest subtask-leaf should have transition to the actual end (virtual) node.
 * All other leafs should only hold id of the node they're supposed to be connected to.
 * This is in order to avoid processing the same node multiple times when constructing a vis-graph.
 */
test('Flattened subtasks have properly assigned transitions to the end node', () => {
  const flattenedGraph = flattenComposites(mock.compositeNodeWithTransitions);

  const [subtask1, subtask2] = [flattenedGraph.on._subtask_0, flattenedGraph.on._subtask_1];

  expect(subtask1.on).toHaveProperty('_subtask_end');
  expect(subtask2.on).toHaveProperty('_subtask_end');

  expect(subtask1.on._subtask_end).toBeInstanceOf(Object); // the deepest subtask-leaf
  expect(typeof subtask2.on._subtask_end).toBe('string'); // only reference
});

// ************************
// graph construction tests
// ************************

test('Single node is parsed correctly', () => {
  const expectedGraph = {
    nodes: [createNode('A', 'A label', 'success', 0)],
    edges: [],
  };

  const graph = constructGraph(mock.singleNode);

  expect(graph).toStrictEqual(expectedGraph);
});

test('Single node can have multiple transitions', () => {
  const expectedEdges = [
    createEdge('A', 'A A', true, '_success', COLOR_SUCCESS),
    createEdge('A', 'A B', true, '_error', COLOR_ERROR),
    createEdge('A', 'A C', false, 'custom1'),
  ];

  const graph = constructGraph(mock.singleNodeWithTransitions);

  expect(graph.edges).toIncludeSameMembers(expectedEdges);
});

test('Composites have to have "subtasks" field defined', () => {
  expect(() => constructGraph(mock.compositeWithoutSubtasksField)).toThrow();
});

test('Composites can have no subtasks', () => {
  const expectedGraph = {
    nodes: [
      createNode('A_virtual', '', 'virtual', 0),
      createNode('A_virtual2', '', 'virtual_unprocessed', 1),
    ],
    edges: [
      createEdge('A_virtual', 'A_virtual2', true),
    ],
  };

  const graph = constructGraph(mock.compositeNodeWithNoSubtasks);

  expect(graph.nodes).toStrictEqual(expectedGraph.nodes);
  expect(graph.edges).toIncludeSameMembers(expectedGraph.edges);
});

test('Composite\'s have proper transitions to subtasks', () => {
  const expectedEdges = [
    createEdge('A_virtual', 'A-A'),
    createEdge('A_virtual', 'A-B'),
    createEdge('A-A', 'A_virtual2'),
    createEdge('A-B', 'A_virtual2'),
    createEdge('A_virtual2', 'A A', false, '_success', COLOR_SUCCESS),
  ];

  const graph = constructGraph(mock.compositeNodeWithTransitions);

  expect(graph.edges).toIncludeSameMembers(expectedEdges);
});

test('Composite end is one level below the deepest subtask', () => {
  const expectedNodes = [
    createNode('A_virtual', '', 'virtual', 0),
    createNode('A-A', 'A-A label', 'success', 1),
    createNode('A-B', 'A-B label', 'success', 1),
    createNode('A-A A', 'A-A A label', 'success', 2),
    createNode('A-A B', 'A-A B label', 'unprocessed', 2),
    createNode('A-A A A', 'A-A A A label', 'success', 3),
    createNode('A_virtual2', '', 'virtual_success', 4),
  ];

  const graph = constructGraph(mock.compositeWithUnevenSubtasks);

  expect(graph.nodes).toStrictEqual(expectedNodes);
});

test('Composite\'s transitions are one level below it\'s virtual node', () => {
  const expectedGraph = {
    nodes: [
      createNode('A_virtual', '', 'virtual', 0),
      createNode('A-A', 'A-A label', 'error', 1),
      createNode('A-B', 'A-B label', 'success', 1),
      createNode('A-B A', 'A-B A label', 'success', 2),
      createNode('A_virtual2', '', 'virtual_error', 3),
      createNode('B', 'B label', 'error', 4),
    ],
    edges: [
      createEdge('A_virtual', 'A-A'),
      createEdge('A_virtual', 'A-B'),
      createEdge('A-A', 'A_virtual2'),
      createEdge('A-B', 'A-B A', false, '_error', COLOR_ERROR),
      createEdge('A-B A', 'A_virtual2'),
      createEdge('A_virtual2', 'B', false, '_success', COLOR_SUCCESS),
    ],
  };

  const graph = constructGraph(mock.compositeWithComplexTransitions);

  expect(graph.nodes).toStrictEqual(expectedGraph.nodes);
  expect(graph.edges).toIncludeSameMembers(expectedGraph.edges);
});

test('Unprocessed subtasks have proper transition to virtual composite node', () => {
  const expectedGraph = {
    nodes: [
      createNode('A_virtual', '', 'virtual', 0),
      createNode('A-A', 'A-A label', 'success', 1),
      createNode('A-A A', 'A-A A label', 'error', 2),
      createNode('A-A B', 'A-A B label', 'unprocessed', 2),
      createNode('A_virtual2', '', 'virtual_error', 3),
    ],
    edges: [
      createEdge('A_virtual', 'A-A'),
      createEdge('A-A', 'A-A A', false, '_success', COLOR_SUCCESS),
      createEdge('A-A', 'A-A B', true, '_error', COLOR_ERROR),
      createEdge('A-A A', 'A_virtual2'),
      createEdge('A-A B', 'A_virtual2', true),
    ],
  };

  const graph = constructGraph(mock.compositeWithUnprocessedNodeInSubtask);

  expect(graph.nodes).toStrictEqual(expectedGraph.nodes);
  expect(graph.edges).toIncludeSameMembers(expectedGraph.edges);
});

test('Missing subtasks have proper transition to virtual composite node', () => {
  const expectedGraph = {
    nodes: [
      createNode('A_virtual', '', 'virtual', 0),
      createNode('A-A', 'A-A label', 'other', 1),
      createNode('A-A A', 'A-A A label', 'missing', 2),
      createNode('A_virtual2', '', 'virtual_error', 3),
    ],
    edges: [
      createEdge('A_virtual', 'A-A'),
      createEdge('A-A', 'A-A A', false, 'custom', COLOR_OTHER),
      createEdge('A-A A', 'A_virtual2'),
    ],
  };

  const graph = constructGraph(mock.compositeWithMissingNodeInSubtask);

  expect(graph.nodes).toStrictEqual(expectedGraph.nodes);
  expect(graph.edges).toIncludeSameMembers(expectedGraph.edges);
});

test('Composites can be nested', () => {
  const expectedGraph = {
    nodes: [
      createNode('A_virtual', '', 'virtual', 0),
      createNode('A-A_virtual', '', 'virtual', 1),
      createNode('A-A-A', 'A-A-A label', 'error', 2),
      createNode('A-A_virtual2', '', 'virtual_error', 3),
      createNode('A_virtual2', '', 'virtual_error', 4),
    ],
    edges: [
      createEdge('A_virtual', 'A-A_virtual'),
      createEdge('A-A_virtual', 'A-A-A'),
      createEdge('A-A-A', 'A-A_virtual2'),
      createEdge('A-A_virtual2', 'A_virtual2'),
    ],
  };

  const graph = constructGraph(mock.nestedComposites);

  expect(graph.nodes).toStrictEqual(expectedGraph.nodes);
  expect(graph.edges).toIncludeSameMembers(expectedGraph.edges);
});
