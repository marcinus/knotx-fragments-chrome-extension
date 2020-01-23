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

export const knotxNodes = () => {
  const rootElem = document.body;
  const COMMENTS = [];
  const COMMENT_NODE_CODE = 8;
  const HTML_NODE_CODE = 1;
  // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
  const iterator = document.createNodeIterator(
    rootElem,
    NodeFilter.SHOW_ALL,
  );

  let curNode;
  let isBetweenComments = false;
  let curComment = '';
  // eslint-disable-next-line no-cond-assign
  while ((curNode = iterator.nextNode())) {
    if (
      curNode.nodeType === COMMENT_NODE_CODE
          && curNode.data.indexOf('data-knotx-id') !== -1
    ) {
      isBetweenComments = !isBetweenComments;
      curComment = isBetweenComments ? curNode.data.match(/"([^']+)"/)[1] : '';
    }

    if (
      isBetweenComments
          && curNode.nodeType !== COMMENT_NODE_CODE
          && curNode.nodeType === HTML_NODE_CODE
    ) {
      if (!COMMENTS.length) {
        curNode.dataset.knotxId = curComment;
        COMMENTS.push(curNode);
      } else if (!COMMENTS[COMMENTS.length - 1].contains(curNode)) {
        curNode.dataset.knotxId = curComment;
        COMMENTS.push(curNode);
      }
    }
  }

  /**
     * Converts list of nodes from all comments to Fragments. Example inputs / outputs:
     * - [script, node] -> [ { script, node } ]
     * - [ script, node, script, node, node ] -> [ { script, node }, { script, node, node } ]
     */
  const fragments = [];
  let currentFragment = {};
  COMMENTS.forEach((node) => {
    if (node.type === 'application/json') {
      currentFragment = {};
      currentFragment.debug = JSON.parse(node.innerText);
      fragments.push(currentFragment);
    } else {
      let { nodes } = currentFragment;
      if (nodes === undefined) {
        nodes = [];
      }
      nodes.push(node);
      currentFragment.nodes = nodes;
    }
  });
  return fragments;
};
