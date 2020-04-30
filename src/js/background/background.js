
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
  succesLoadExtensionMsgs,
  chromeConnections,
  chromeActions,
} from '../helpers/constants';
import { dumpOptions } from '../content/dump';

wrapStore(store);

const reloadAllPages = () => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });
  });
};

chrome.runtime.onInstalled.addListener(() => reloadAllPages());
chrome.management.onEnabled.addListener(() => reloadAllPages());


chrome.tabs.onRemoved.addListener((tabId) => {
  store.dispatch(removePageData({ id: tabId }));
});


chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (sender.tab && request.type === chromeActions.INIT_STORE) {
      const pageDataObj = {
        fragments: request.fragmentsData,
        id: sender.tab.id,
        url: sender.tab.url,
      };

      store.dispatch(setPageData(pageDataObj));

      const { pageData } = store.getState();
      const currentPageData = pageData[pageDataObj.id];

      if (currentPageData?.fragments?.length && currentPageData.url) {
        sendResponse({
          status: status.succes,
          msg: succesLoadExtensionMsgs,
          obj: pageData,
        });
      }
    }
  },
);


chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== chromeConnections.KNOTX_DEVTOOL_CONNECTION) return;

  port.onMessage.addListener((request) => {
    if (request.type === chromeActions.GET_CURRENT_TAB_INFO) {
      chrome.tabs.query({
        active: true,
      },
      (tabs) => {
        port.postMessage(tabs[0]);
      });
    }
  });

  port.onMessage.addListener(async (request) => {
    if (request.type === chromeActions.DUMP_PAGE) {
      // eslint-disable-next-line no-undef
      await singlefile.extension.injectScript(request.data.tabId, dumpOptions);
      await chrome.tabs.executeScript(
        request.data.tabId,
        { code: 'dump()', allFrames: false, runAt: 'document_idle' },
      );
      await port.postMessage('dump_complete');
    }
  });
});
