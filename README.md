# Knot.x Fragments Chrome Extension
Extends the Developer Tools, adding a sidebar that displays [Fragments](https://github.com/Knotx/knotx-fragments)
data associated with the selected DOM element.

<p align="center">
  <img src="assets/images/preview.gif" alt="Knot.x Fragments Chrome Extension"/>
</p>

It is a bridge between the business logic (domain) and the solution. Domain experts can
easily verify the implementation of business logic, define new scenarios and deal with network problems
(defining fallbacks) gradually. Developers and QAs can easily learn business logic, verify API
responses/delays, and check page rendering performance issues.

See the main benefits:

| Developer   | Quality Assurance | Business |
|:------------|:------------------|:---------|
| - Easier debugging.​ <br> - New developers can quickly understand the backend data flow. <br>​ - Developers can easier identify the bug root cause (service/backend/frontend layer).​ <br> - Tool can be helpful during QA demo sessions.​ |  - Easier to analyse weak points in the backend logic​ <br> - Enable inspecting for root causes of page rendering performance issues | - Business can easily analyse/verify the business logic implementation <br> - Visualization can be used in always up-to-date documentation.​ |

## How to start?
You can easily build the extension and select `dist` directory from Chrome extensions page. Follow
the instructions below:

- Build the extension:
  - go to the project folder
  - run command: `yarn install`
  - run command: `yarn run dev` or `yarn run watch` if you want to enable auto detect changes in code.
- Load the extension from disk (more details [here](https://developer.chrome.com/extensions/getstarted) )
  - open the Chrome Extension Management page by navigating to `chrome://extensions`.
  - enable Developer Mode by clicking the toggle switch next to *Developer mode*.
  - click the *LOAD UNPACKED* button and select the `dist` directory.
- Run `samples`
  - go to the `assets/samples` folder
  - run command: `npm install http-server -g`
  - run command: `npx http-server`
- See the extension in action
  - open the sample pate by navigating to [127.0.0.1:8080/payments.html](http://127.0.0.1:8080/payments.html)
  - activate the Chrome Dev Tools (`F12`)
  - select the Knot.x panel

## How does it work?

### Debug fragment data

Knot.x Fragments, when run in debug mode, injects information about fragments into the output.
This information can then be read, parsed and displayed by various tools. Knot.x Fragments Chrome Extension is the official tool for this purpose.

Of course fragments' outputs can have various formats. Currently, Knot.x supports injecting debug information into HTML only.
Therefore, this tool only works for fragment-generated HTML pages.
JSON support is planned for the near future.

### HTML structure

When the HTML document is generated by the Fragments Engine in debug mode, special comments and tags are injected to indicate what data comes from which fragment.

For example, a page like this:

```html
<body>
  <header>
    Weather Service
  </header>

  <knotx:snippet data-knotx-task="weather-task">
    <span>
      {{fetch-weather-info._result.temperatue}} in {{fetch-weather-info._result.location}}
    </span>
  </knotx:snippet>
</body>
```

could result in:

```html
<body>
  <header>
    Weather Service
  </header>

  <!-- data-knotx-id="auto-generated-id" -->
  <script data-knotx-debug="log" data-knotx-id="auto-generated-id" type="application/json">{ debug-data-here }</script>

  <span>
    -2°C in Reykjavík
  </span>

  <!-- data-knotx-id="auto-generated-id" -->
</body>
```

Note that the browser displays the page as usual, the injected information does not affect the presentation.
There are two parts of the debug information:
- The data that was part of the Knot.x snippet is surrounded by special comments with auto-generated IDs. This is mainly used by the tool to provide highlighting functionality.
- The script tag with a JSON inside precedes the fragment content.  All important data is stored here. It mainly contains information about the processing of the fragment nodes: which nodes were triggered, what transition they activated, how much time they took etc.

### HTML parsing

The chrome extension uses 3 parsers to read the fragment data in HTML.

```
•
└── helpers
    ├── graph
    │   └── declarationHelper.js
    ├── timeline
    │   └── declarationHelper.js
    └── nodesHelper.js
```

#### Nodes parser

The `nodesHelper.js` lists all the fragments on the page.
It provides `parseFragments` method that takes an HTML element (the whole document, in practice) and returns a list of all fragments like this:

```json5
[
  {
    "debug": {}, // raw debug data from the fragment's script tag
    "nodes": [
      {
        "tag": "div",
        "selector": "css-selector-for-this-node-only"
      },
      // more nodes ...
    ]
  },
  // more fragments ...
]
```

It works by traversing all HTML nodes using [Node Iterator](https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator) and finding pairs of Knot.x comments that mark the beginning and end of a fragment.
It then:
- finds all top-level nodes in between (comments' siblings),
- reads debug data from the first one (which is always a script tag with debug data),
- and transforms the data into the above form

#### Graph parser

The `graph/declarationHelper.js` parses a given fragment's debug JSON (from the fragment's script tag) into a form understandable by (Vis.js Network)[https://visjs.github.io/vis-network/docs/network/], a library for displaying graphs.
It provides `constructGraph` method that takes fragment's JSON as input and returns Vis.js-compatible datasets:

```json5
{
  "nodes": [
    {
      "id": "node-id",
      "label": "A node",
      "group": "success",
      "level": 0
    },
    // ...
  ],
  "edges": [
    {
      "from": "node-id",
      "to": "another-node-id",
      "label": "_success",
      "dashes": false,
      "font": {
        "color": "00CC00"
      },
      "color": "#000000"
    },
    // ...
  ]
}
```

It is then ready to be displayed in the form of a graph (specifically a tree unless there are composite nodes in the fragment).

Internally the parser consists of two phases:
- flattening - The fragment's graph is normally a tree (an undirected graph in which any two vertices are connected by exactly one path). However, composite nodes reference subtasks which are another tree each. This phase creates a new graph structure where all the nodes are part of this graph (there are no sub-graphs).
- datasets creation - In this phase, the flattened graph is traversed depth-first and the above datasets are constructed.

Flattening of the graph transforms a structure like this:

```json5
{
  "id": "composite-node",
  // ...
  "on": {
    "_success": {
      "id": "next-node"
      // ...
    }
  },
  "subtasks": [
    {
      "id": "subtask-1",
      // ...
    },
    {
      "id": "subtask-2",
      // ...
    }
  ]
}
```

Into a graph like this:

```json5
{
  "id": "composite-node_virtual",
  // ...
  "on": {
    "_subtask_0": {
      "id": "subtask-1",
      // ...
      "on": {
        "_subtask_end": {
          "id": "composite-node_virtual_end",
          // ...
          "on": {
            "_success": { // original transition
              "id": "next-node",
              // ...
            }
          }
        }
      }
    },
    "_subtask_1": {
      "id": "subtask-2",
      // ...
      "on": {
        "_subtask_end": "composite-node_virtual_end" // note this is only an ID (!)
      }
    }
  }
}
```

An important thing to note is that, while all subtasks end with a transition to the `composite-node_virtual_end` node, only one of them (the deepest) contains an actual object in the transition.
All other subtasks end with a transition into a string. It's termed `a reference` in the code and it's an ID of the actual node.
It is like that to avoid duplication. Without it, the dataset-creation algorithm would treat transisions to the same node as transitions to multiple unique nodes.
It'd result in parts of graph being copied multiple times, instead of multiple transitions transitioning to the same node.

#### Timeline parser

The `timeline/declarationHelper.js` parses a given fragment's debug JSON (from the fragment's script tag) into a form understandable by (Vis.js Timeline)[https://visjs.github.io/vis-timeline/docs/timeline/], a library for displaying Gantt charts.
It provides `constructTimeline` method that takes fragment's JSON as input and returns Vis.js datasets.

Output looks like this:

```json5
{
  "items": [ // not an actual array, a vis.DataSet object
    {
      "id": "a-node",
      "start": 100000, // timestamp
      "end": 20000, // timestamp
      "content": "", // items have no labels in the currect implementation
      "group": "A group"
    },
    // ...
  ],
  "groups": [ // not an actual array, a vis.DataSet object
    {
      "id": "A group",
      "order": 0,
      "content": "A group",
      "nestedGroups": ["another group id", "and another one"] // null in case of no subgroups (can't be an empty array because of how Vis.js displays it)
    },
    // ...
  ]
}
```

Parser consists of the following phases:
- constructing a unique-labeled graph - node labels are later used as group names/IDs so they have to be unique. In case of duplicated IDs they are numerated: `label`, `label (#2)`, `label (#3)`, etc
- filtering processed nodes - for this chart we're interested in the processed nodes only
- creating `itmes` and `groups` datasets

## Used technologies

### Extensions / Plugins
main plugins:

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Webext](https://github.com/tshaddix/webext-redux)
* [styled-components](https://styled-components.com/)
* [vis-network](https://visjs.github.io/vis-network/docs/network/)
* [vis-timeline](https://visjs.github.io/vis-timeline/docs/timeline/)
* [unique-selector](https://github.com/ericclemmons/unique-selector)
* [renderjson](https://github.com/caldwell/renderjson)
* [react-fontawesome](https://github.com/FortAwesome/react-fontawesome)
* [Jest](https://jestjs.io/docs/en/cli.html)
* [Enzyme](https://enzymejs.github.io/enzyme/)
* [semver](https://github.com/npm/node-semver#readme)
* [Babel](https://babeljs.io/)
* [Eslint](https://eslint.org/)
* [Webpack](https://webpack.js.org/)
* [SingleFile](https://github.com/gildas-lormeau/SingleFileyg )

### CI
The GitHub repository is integrated with Azure Pipelines (CI) to validate both new PRs and the master branch. Check the azure-pipelines.yml file for configuration details. So we check:

* code conventions with Eslint
* code logic with unit tests using Jest
* test coverage level with preconfigured thresholds (see jest.config.js for more details).

## Testing
We believe that unit tests remain the best documentation. All React components, processing logic (helpers) and actions (such as a button click) are validated with unit tests. We use Jest and Enzyme frameworks to validate both components (React) with combination with mocked storage (Redux).


All JS files (components & helpers) have their own tests that are placed next to the tested sources. We follow the convention:
* ```*.mock.js``` - it is configuration containing mocks for our tests
* ```*.spec.jsx``` - it contains unit tests


Additionally, we placed tests coverage verification in our CI. We use the jest-coverage tool for that. We decided to keep the coverage level at truly high levels (80 - 100%). It should enable future refactoring and code changes.


When tests are executed, then we generate the report (test-report.xml) file in the build/test folder. Moreover, there is the coverage directory that contains the index.html file with unit tests coverage report.


### How to run tests?
1. run command to fire all tests: `yarn run test`
2. run command to fire the specific test: `yarn run test [path_to_test]`

## Implementation details

### Data flow
An extension's architecture includes such components as:

background script that contains listeners for browser events and communication with Redux
content script that contains JavaScript that executes in the context of a page that has been loaded in the browser.
Depending on the format (JSON or HTML markup), fragments' debug data is processed by the content script first and then stored in Redux with the background script (which basically wraps Redux store). Content script transformations are described [here](https://github.com/Knotx/knotx-fragments-chrome-extension#debug-fragment-data).

```
KNOT.x -> HTML MARKUP -> CONTENT SCRIPT -> BACKGROUND SCRIPT -> REDUX -> COMPONENTS
                               ^
                               |
                         Parsing helper
```

### Components
The components structure in the main concept look like this:

```
•
└── App:
    ├── SidePanel
    │   ├── FragmenList
    │   │   └── FragmentListItem
    │   │       └── NodeList
    │   └── FragmentGannt
    │
    └── MainPanel
        └── Graph
            ├──  Timeline
            ├──  Legend
            │    └── LegendSection
            └──  NodeInfo
```

You can find interactive documentation for all components in our [storybook](https://storybook.js.org/).

To open the storybook follow the steps below:
- run command ``` yarn storybook ```
- go to [localhost:6006](http://localhost:6006/)

#### Graph && timelines
We use `vis.js` library to visualise [fragments](https://github.com/Knotx/knotx-fragments/tree/master/api#fragment)' processing details. See the following components:
- Timeline showing the processing time of  all fragments (`SidePanel `: `FragmentGantt` component)
- Chart presenting the logic of processing a particular fragment (`MainPanel `: `Graph` component)
- Timeline showing the processing times of all steps performed while processing a specific fragment (`MainPanel `: `Timeline` component)

### Styling
We don't use any grid system to make our app beautiful. Everything is flex. To show and hide elements we try to use a react state, without saving this information in the redux store. SidePanelExpanded info is currently the only one exception.

To create styles we use styling-component. We follow the convention to create a style file next to js file.

 ```
•
├── exampleComponent.js
└── exampleComponent.style.js
```

some global styling and styling for renderjson markupwe store in
 ```
/src/js/styling/globalStyle.js
  ```

### Data storage
We use Redux as storage. It keeps details about:
- parsed list of fragments
- application state such as details which panel was expanded/hidden etc.

Once loaded page data is stored in a map where:
- key is a Chrome tab identifier
- value contains fragments, page data and application state per tab.

Such storage solution makes it easy to analyse many pages at the same time, switching between them, and running many Chrome Dev Tools Console instances.

The example below presents how data is stored in Redux:


```
•
└── pageData:
    ├── 78: // tab id
    │   ├── fragments: [] // list of fragments
    │   ├── url: "https://example.com // page url
    │   ├── sidebarExpanded: true // side panel expanded switch
    │   └── renderedGraph: null // id of the currently selected fragment
    └── 110:
        └── ...
```

The pageData entry is created on page load and destroyed when we close the tab. If the page does not contain Knot.x fragments, fragments property is empty.

## Page dump functionality
We provide page dump functionality to allow easier bug reproducing on another machine. User can downlad current state of page when he find a bug, instead of refreshing the page in hope that the bug disappear.

To provide this functionality we include SingleFile extension in our extension. Information about how to include SingleFile API into extension you can find [here](https://github.com/gildas-lormeau/SingleFile/wiki/How-to-integrate-the-API-of-SingleFile-into-an-extension)


User can dump page by click on 'dump page button' in extention popup. This click fire the following data flow:

```
popup -> background -> content -> popup

```

dump function you can find in ```/src/js/content/dump.js```

## Contributors
