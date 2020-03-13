# Knot.x Fragments Chrome Extension
Extends the Developer Tools, adding a sidebar that displays Fragments data associated with the 
selected DOM element.

// TODO why do we need this?

## How to start?
You can easily build the extension and select `dist` directory from Chrome extensions page. Follow 
the instructions below:

- Build the extension:
  - go to the project folder
  - run command: `yarn install`
  - run command: `yarn run dev`
- Load the extension from disk (more details [here](https://developer.chrome.com/extensions/getstarted) )
  - open the Chrome Extension Management page by navigating to `chrome://extensions`.
  - enable Developer Mode by clicking the toggle switch next to *Developer mode*.
  - click the *LOAD UNPACKED* button and select the `dist` directory.
- Run `samples`
  - go to the `samples` folder
  - run command: `npm install http-server -g`
  - run command: `npx http-server`
- See the extension in action
  - open the sample pate by navigating to [127.0.0.1:8080/payments.html](http://127.0.0.1:8080/payments.html)
  - activate the Chrome Dev Tools (`F12`)
  - select the Knot.x panel

## How does it work?
Knot.x working in debug mode marks the beginning and the end of the snippet fragment with HTML 
comments:
```
<!-- data-knotx-id="FRAGMENT_IDENTIFIER" -->
  FRAGMENT_BODY
<!-- data-knotx-id="FRAGMENT_IDENTIFIER" -->
```

Fragment details are stored in `<script>` tag:
```
<!-- data-knotx-id="FRAGMENT_IDENTIFIER" -->
  <script data-knotx-id="FRAGMENT_IDENTIFIER" type="application/json">
    FRAGMENT_DEBUG_DATA
  </script>
  FRAGMENT_BODY
<!-- data-knotx-id="FRAGMENT_IDENTIFIER" -->
```

Knot.x Fragments Chrome Extension reads data from the HTML response and loads fragment's debug data 
and visualize [Task](https://github.com/Knotx/knotx-fragments/tree/master/engine#task) details.

## Used technologies

### Extensions / Plugins

### CI

### Testing

## Implementation details

### Parsing HTML

### Components

#### Graph

#### Timelines

### Data storage

## Contributors

### How to run?
1. go to the project folder
2. run command: `yarn install`
3. run command: `yarn run dev`

### How to test?
1. run command to fire all tests: `yarn run test`
2. run command to fire specific test: `yarn run test [path_to_test]`