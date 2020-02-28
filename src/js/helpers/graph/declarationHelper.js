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

import GraphLayers from './graphLayers';

export const getNodeGroup = (node) => {
  if (node.type === 'virtual_start') {
    return 'virtual';
  }

  if (node.type === 'virtual_end') {
    return `virtual_${node.status.toLowerCase()}`;
  }

  return node.status.toLowerCase();
};

export const isComposite = (node) => node.type.toLowerCase() === 'composite';

const isEmptyObject = (object) => object.constructor === Object && Object.entries(object).length === 0;

export const hasTransitions = (node) => !!node.on && !isEmptyObject(node.on);

const isReference = (node) => typeof node === 'string';

const getReference = (node) => node.id;

const createVisNode = (node) => ({
  id: node.id,
  label: node.label,
  group: getNodeGroup(node),
});

const getLeafs = (root, depth = 0) => {
  if (!hasTransitions(root)) {
    return { node: root, depth };
  }

  return Object.entries(root.on).flatMap(([, child]) => getLeafs(child, depth + 1));
};

const createTransitionTo = (node, name) => ({ name, node, isReference: typeof node === 'string' });

const getTransitions = (node) => {
  if (hasTransitions(node)) {
    return Object.entries(node.on)
      .map(([transitionName, child]) => createTransitionTo(child, transitionName));
  }

  return [];
};

const createVirtualStartNode = (composite, transitions) => ({
  ...composite,
  label: '',
  type: 'virtual_start',
  id: `${composite.id}_virtual`,
  on: transitions,
});

const createVirtualEndNode = (composite, transitions) => ({
  ...composite,
  label: '',
  type: 'virtual_end',
  id: `${composite.id}_virtual2`,
  on: transitions,
});

const createTransitionsToSubtasks = (subtasks) => subtasks
  .reduce((total, current, index) => ({ ...total, [`_subtask_${index}`]: current }), {});

const sortDeepestFirst = (leaf1, leaf2) => leaf2.depth - leaf1.depth;

const putTransitionInLeafs = (root, transitionName, transitionTo) => getLeafs(root)
  .sort(sortDeepestFirst)
  .map((leaf) => leaf.node)
  .filter((leaf) => !isReference(leaf))
  .forEach((leaf, index) => {
    const node = leaf;
    const to = index === 0 ? { ...transitionTo } : getReference(transitionTo);

    node.on = { [transitionName]: to };
  });

export const flattenComposites = (node) => {
  let flattenedNode;

  if (isComposite(node)) {
    const compositeTransitions = node.on;
    const startNodeTransitions = createTransitionsToSubtasks(node.subtasks);

    const startNode = createVirtualStartNode(node, startNodeTransitions);
    const endNode = createVirtualEndNode(node, compositeTransitions);

    if (node.subtasks.length > 0) {
      Object.entries(startNode.on).forEach(([transition, child]) => {
        startNode.on[transition] = flattenComposites(child);
      });

      putTransitionInLeafs(startNode, '_subtask_end', endNode);
    } else {
      startNode.on = { _subtask_end: endNode };
    }

    flattenedNode = startNode;
  } else {
    flattenedNode = { ...node };

    if (hasTransitions(flattenedNode)) {
      Object.entries(flattenedNode.on).forEach(([transition, child]) => {
        flattenedNode.on[transition] = flattenComposites(child);
      });
    }
  }

  return flattenedNode;
};

const constructDatasets = (node, graphLayers = new GraphLayers(), layer = 0) => {
  const visNode = createVisNode(node);

  graphLayers.addVisNode(visNode, layer);

  const transitions = getTransitions(node);

  transitions.forEach((transition) => {
    if (!transition.isReference) {
      constructDatasets(transition.node, graphLayers, layer + 1);
    }

    graphLayers.addVisEdge(node, transition);
  });

  return {
    nodes: graphLayers.nodesDataset,
    edges: graphLayers.edgesDataset,
  };
};

export const constructGraph = (jsonGraph) => {
  const flattenedGraph = flattenComposites(jsonGraph);

  return constructDatasets(flattenedGraph);
};
