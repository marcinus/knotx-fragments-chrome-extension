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

export const isFragmentBoundary = (node) => node.nodeType === Node.COMMENT_NODE
  && /data-knotx-id="(.*)"/.test(node.data);

export const isFragmentNode = (node) => node.nodeType === Node.ELEMENT_NODE
  || (node.nodeType === Node.TEXT_NODE && !!node.textContent.trim());

export const getFragmentId = (node) => (node.data.match(/data-knotx-id="(.*)"/) || [])[1];

export const isFragmentDataNode = (node, fragmentId) => node && node.tagName === 'SCRIPT'
  && node.dataset.knotxId === fragmentId;

const findBoundaries = (root) => {
  const iterator = document.createNodeIterator(root, NodeFilter.SHOW_ALL);
  const boundaries = new Map();
  let node = iterator.nextNode();

  while (node) {
    if (isFragmentBoundary(node)) {
      const id = getFragmentId(node);

      if (boundaries.has(id)) {
        boundaries.set(id, { ...boundaries.get(id), endNode: node });
      } else {
        boundaries.set(id, { startNode: node });
      }
    }

    node = iterator.nextNode();
  }

  return Array.from(boundaries.entries())
    .map(([key, value]) => ({ id: key, ...value }));
};

const getNodesBetween = (firstNode, lastNode) => {
  const nodes = [];
  let node = firstNode.nextSibling;

  while (node && node !== lastNode) {
    nodes.push(node);
    node = node ? node.nextSibling : null;
  }

  return nodes;
};

const createFragment = (id, nodes) => {
  const fragmentNodes = nodes.filter(isFragmentNode);
  let debug = {};

  if (isFragmentDataNode(fragmentNodes[0], id)) {
    const debugScript = fragmentNodes.shift();
    debug = JSON.parse(debugScript.textContent.trim() || '{}');
  }

  fragmentNodes
    .filter((node) => node.nodeType === Node.ELEMENT_NODE)
    .forEach((node) => node.setAttribute('data-knotx-id', id));

  return { nodes: fragmentNodes, debug };
};

const parseFragments = (root) => findBoundaries(root)
  .filter((boundary) => !!boundary.endNode)
  .map(({ id, startNode, endNode }) => ({ id, nodes: getNodesBetween(startNode, endNode) }))
  .map(({ id, nodes }) => createFragment(id, nodes));

export const findFragmentsInContent = () => parseFragments(document.body);
