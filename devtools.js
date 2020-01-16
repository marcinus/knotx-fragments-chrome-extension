let knotxNodes = function() {
  let rootElem = document.body;
  const COMMENTS = [];
  const COMMENT_NODE_CODE = 8;
  const HTML_NODE_CODE = 1;
  // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
  const iterator = document.createNodeIterator(
      rootElem,
      NodeFilter.SHOW_ALL
  );

  let curNode;
  let isBetweenComments = false;
  let curComment = "";
  while ((curNode = iterator.nextNode())) {
    if (
        curNode.nodeType === COMMENT_NODE_CODE &&
        curNode.data.indexOf("data-knotx-id") !== -1
    ) {
      isBetweenComments = !isBetweenComments;
      curComment = isBetweenComments ? curNode.data.match(/"([^']+)"/)[1] : "";
    }

    if (
        isBetweenComments &&
        curNode.nodeType !== COMMENT_NODE_CODE &&
        curNode.nodeType === HTML_NODE_CODE
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
  let fragments = [];
  let currentFragment = {};
  COMMENTS.forEach(function (node) {
    if (node.type === "application/json") {
      currentFragment = {};
      currentFragment['debug'] = JSON.parse(node.innerText);
      fragments.push(currentFragment);
    } else {
      let nodes = currentFragment['nodes'];
      if (nodes === undefined) {
        nodes = [];
      }
      nodes.push(node);
      currentFragment['nodes'] = nodes;
    }
  });
  return fragments;
};

chrome.devtools.panels.elements.createSidebarPane("Knot.x Fragments",
    function (sidebar) {

      function updateElementProperties() {
        sidebar.setExpression("(" + knotxNodes.toString() + ")()");
      }

      updateElementProperties();
      chrome.devtools.panels.elements.onSelectionChanged.addListener(
          updateElementProperties);
    }
);
