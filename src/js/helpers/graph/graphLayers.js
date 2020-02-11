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
  COLOR_SUCCESS, COLOR_ERROR, COLOR_OTHER, COLOR_UNPROCESSED_EDGE, COLOR_DEFAULT_EDGE,
} from './drawingHelper';

const getEdgeLabel = (label) => (/^_subtask_([0-9+]|end)$/.test(label) ? '' : label);

const getEdgeLabelColor = (label) => {
  switch (label) {
    case '_success':
      return COLOR_SUCCESS;
    case '_error':
      return COLOR_ERROR;
    default:
      return COLOR_OTHER;
  }
};

const getTransitionType = (from, transition) => {
  const { node: to, name } = transition;

  if (from.response && from.response.transition === name) {
    return 'processed';
  }

  if (from.status === 'unprocessed') {
    return 'unprocessed';
  }

  if (from.type === 'virtual_start' || to.type === 'virtual_end' || transition.isReference) {
    return 'processed';
  }

  return 'unprocessed';
};

export default class GraphLayers {
  constructor() {
    this.layers = [];
    this.connections = [];
  }

  addVisNode(node, layer) {
    const layeredNode = { ...node, level: layer };

    if (this.layers[layer]) {
      this.layers[layer].push(layeredNode);
    } else {
      this.layers[layer] = [layeredNode];
    }
  }

  addVisEdge(from, transition) {
    const type = getTransitionType(from, transition);

    this.connections.push({
      from: from.id,
      to: transition.isReference ? transition.node : transition.node.id,
      label: getEdgeLabel(transition.name),
      font: {
        color: getEdgeLabelColor(transition.name),
      },
      dashes: type === 'unprocessed',
      color: type === 'unprocessed' ? COLOR_UNPROCESSED_EDGE : COLOR_DEFAULT_EDGE,
    });
  }

  get nodesDataset() {
    return this.layers.flat();
  }

  get edgesDataset() {
    return this.connections;
  }
}
