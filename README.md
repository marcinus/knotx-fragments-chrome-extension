# Knot.x Fragments Chrome Extension
Extends the Developer Tools, adding a sitebar that displays Fragments data associated with the 
selected DOM element.

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

Knot.x Fragments Chrome Extension reads data from the HTML response and loads 
fragment's debug data and visualize task details.

### How to use?
This extension is not published to the public Chrome web store. Please follow [these instructions](https://developer.chrome.com/extensions/getstarted) 
to run this plugin.

Refresh the page, open Chrome Dev Tools and check the `Knot.x Fragments` sidebar:

![Knot.x Fragments Sidebar][assets/sidebar-view.png]

#### Samples
The `samples` folder contains Knot.x responses that expose the Fragment's debug data. You can easily 
start the NodeJS HTTP server:
```
cd samples
npm install http-server -g
npx http-server
```
and open [http://127.0.0.1:8080/books.html](http://127.0.0.1:8080/books.html).