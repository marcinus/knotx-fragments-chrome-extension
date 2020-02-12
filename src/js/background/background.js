
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

import { wrapStore } from 'webext-redux';
import { setPageData, removePageData } from '../state/actions/pageData';
import { store } from '../state/store';
import {
  status,
  succesMsgs,
  errorMsgs,
  chromeConnections,
  chromeActions,
} from '../helpers/constants';

wrapStore(store);

// reload all tabs (reload pages) when installing extension to reload page data.
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });
  });
});


chrome.tabs.onRemoved.addListener((tabId) => {
  store.dispatch(removePageData({ id: tabId }));
});


chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    const pageDataObj = {
      fragments: request.fragmentsData,
      id: sender.tab.id,
      url: sender.tab.url,
    };

    store.dispatch(setPageData(pageDataObj));

    const { pageData } = store.getState();
    if (pageData[pageDataObj.id].fragments.length > 0 && pageData[pageDataObj.id].url) {
      sendResponse({
        status: status.succes,
        msg: succesMsgs.setPageData,
        obj: pageData,
      });
    } else {
      sendResponse({
        status: status.error,
        msg: errorMsgs.setPageData,
      });
    }
  },
);


chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== chromeConnections.KNOTX_DEVTOOL_CONNECTION) return;

  port.onMessage.addListener((requestType) => {
    if (requestType === chromeActions.GET_CURRENT_TAB_INFO) {
      chrome.tabs.query({
        active: true,
      },
      (tabs) => {
        port.postMessage(tabs[0]);
      });
    }
  });
});
