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

import React from 'react';
import propTypes from 'prop-types';
import { NodeButton, NodeListWrapper } from './nodeList.style';

function evalInContentPage(code) {
  chrome
    .devtools
    .inspectedWindow
    .eval(code);
}

const NodeList = ({ expanded, children }) => {
  function inspectNode(event, selector) {
    event.stopPropagation();
    evalInContentPage(
      `inspect(document.querySelector('${selector}'))`,
    );
  }

  function hideNodeHighlight(selector) {
    evalInContentPage(
      `document.querySelector('${selector}').style.setProperty("background-color","")`,
    );
  }

  function highlightNode(selector) {
    evalInContentPage(
      `document.querySelector('${selector}').style.setProperty("background-color","lightblue","important")`,
    );
  }

  return (
    <NodeListWrapper expanded={expanded}>
      {children.map((node) => (
        <NodeButton
          key={node.selector}
          onClick={(event) => { inspectNode(event, node.selector); }}
          onMouseEnter={() => { highlightNode(node.selector); }}
          onMouseLeave={() => { hideNodeHighlight(node.selector); }}
        >
          {node.tag}
        </NodeButton>
      ))}
    </NodeListWrapper>
  );
};

NodeList.defaultProps = {
  expanded: false,
  children: [],
};

NodeList.propTypes = {
  expanded: propTypes.bool,
  children: propTypes.arrayOf(propTypes.object),
};

export default NodeList;
