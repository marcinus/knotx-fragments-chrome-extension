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

/* eslint-disable max-len */

import { Observable } from 'rxjs';
import GraphLayers from './graphLayers';
import {
  isReference, hasTransitions, hasPreDefinedTransitions, hasTransition, isComposite, getReference,
} from './nodeRecognitionHelper';
import { postProcessNode } from './nodePostProcessor';

export const getNodeGroup = (node) => {
  if (node.type === 'virtual_start') {
    return 'virtual';
  }

  if (node.type === 'virtual_end') {
    return `virtual_${node.status.toLowerCase()}`;
  }

  return node.status.toLowerCase();
};

/* ************************** */
const loadImage = (url) => {
  const img = new Image();

  img.crossOrigin = 'anonymous';
  img.src = url;

  return Observable.fromEvent(img, 'load')
    .map((e) => {
      const canvas = document.createElement('canvas');
      canvas.getContext('2d').drawImage(e.target, 0, 0);
      const dataURL = canvas.toDataURL();
      return dataURL;
    });
};

const returnPromise = () => new Promise((resolve) => {
  loadImage('post.svg')
    .take(1)
    .subscribe((dataUrl) => {
      // eslint-disable-next-line prefer-template
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="390" height="65">'
      + '<rect x="0" y="0" width="100%" height="100%" fill="#7890A7" stroke-width="20" stroke="#ffffff" ></rect>'
      + '<foreignObject x="15" y="10" width="100%" height="100%">'
      + '<div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial; font-size:30px">'
      + ' <em>I</em> am'
      + '<span style="color:white; text-shadow:0 0 20px #000000;">'
        + ' HTML in SVG!</span>'

      // * THIS IMAGE IS NOT RENDERING *
      + '<i style="background-image: url(' + dataUrl + '); display: inline-block; width: 80px; height: 40px; background-size: contain;"></i>'

      + '</div>'
      + '</foreignObject>'
      + '</svg>';


      const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      resolve(url);
    });
});

const createVisNode = async (node) => {
  const result = await returnPromise();

  console.log(result);

  return {
    id: node.id,
    label: `${node.label} xxx`,
    // image: url,
    // shape: 'image',
    group: getNodeGroup(node),
    info: {
      ...node.info,
    },
  };
};

/* ************************** */

const getEndNodes = (root, depth = 0) => {
  if (!hasTransitions(root)) {
    return { node: root, depth };
  }

  if (!hasPreDefinedTransitions(root) && root.type !== 'virtual_start') {
    return [
      ...Object.values(root.on).flatMap((child) => getEndNodes(child, depth + 1)),
      { node: root, depth },
    ];
  }

  return Object.values(root.on).flatMap((child) => getEndNodes(child, depth + 1));
};

const createTransitionTo = (node, name) => ({ name, node, isReference: typeof node === 'string' });

const getTransitions = (node) => Object.entries(node.on || {})
  .map(([transitionName, child]) => createTransitionTo(child, transitionName));

const createVirtualStartNode = (composite, transitions) => ({
  ...composite,
  label: '',
  type: 'virtual_start',
  id: `${composite.id}_virtual`,
  on: transitions,
  info: {
    label: 'compositeStart',
    type: composite.type,
  },
});

const createVirtualEndNode = (composite, transitions) => ({
  ...composite,
  label: '',
  type: 'virtual_end',
  id: `${composite.id}_virtual2`,
  on: transitions,
  info: {
    ...composite,
    label: 'compositeEnd',
  },
});

const createTransitionsToSubtasks = (subtasks) => subtasks
  .reduce((total, current, index) => ({ ...total, [`_subtask_${index}`]: current }), {});

const getNodeWithTransitionInEndNodes = (root, transitionName, transitionTo) => {
  const newRoot = JSON.parse(JSON.stringify(root));

  getEndNodes(newRoot)
    .sort((leaf1, leaf2) => leaf2.depth - leaf1.depth)
    .map((leaf) => leaf.node)
    .filter((leaf) => !isReference(leaf))
    .forEach((leaf, index) => {
      const node = leaf;

      if (!hasTransition(node, transitionName)) {
        const to = index === 0 ? { ...transitionTo } : getReference(transitionTo);
        node.on = { ...node.on, [transitionName]: to };
      }
    });

  return newRoot;
};

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

      flattenedNode = getNodeWithTransitionInEndNodes(startNode, '_subtask_end', endNode);
    } else {
      startNode.on = { _subtask_end: endNode };
      flattenedNode = startNode;
    }
  } else {
    flattenedNode = { ...node };

    if (hasTransitions(flattenedNode)) {
      Object.entries(flattenedNode.on).forEach(([transition, child]) => {
        flattenedNode.on[transition] = flattenComposites(child);
      });
    }
  }

  if (!flattenedNode.info) {
    flattenedNode.info = postProcessNode(node);
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
