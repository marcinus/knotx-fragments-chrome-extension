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

import vis from 'vis-network';

export const defaultGraphConfiguration = {
  nodes: {
    borderWidth: 1,
    borderWidthSelected: 1,
    shape: 'box',
    color: {
      border: 'lightgray',
      background: 'white',
      highlight: {
        border: 'lightgray',
        background: 'lightblue',
      },
      hover: {
        border: 'lightgray',
        background: 'lightblue',
      },
    },
  },
  edges: {
    smooth: {
      type: 'cubicBezier',
      forceDirection: 'vertical',
      roundness: 0,
    },
    color: 'lightgray',
  },
  layout: {
    hierarchical: {
      levelSeparation: 80,
      direction: 'UD',
      nodeSpacing: 150,
    },
  },
  tooltip: {
    delay: 100,
    fontColor: 'black',
    fontSize: 14,
    fontFace: 'verdana',
    color: {
      border: '#666',
      background: '#FFFFC6',
    },
  },
  interaction: {
    dragNodes: false,
  },
  physics: false,
};

export const drawGraph = (
  graph,
  options = defaultGraphConfiguration,
) => new vis.Network(document.getElementById('exampleGraph'), graph, options);
