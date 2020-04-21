
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
    if (sender.tab) {
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


const options = {
  removeHiddenElements: true,
  removeUnusedStyles: true,
  removeUnusedFonts: true,
  removeFrames: false,
  removeImports: true,
  removeScripts: true,
  compressHTML: true,
  compressCSS: true,
  loadDeferredImages: true,
  loadDeferredImagesMaxIdleTime: 1500,
  loadDeferredImagesBlockCookies: true,
  loadDeferredImagesBlockStorage: false,
  filenameTemplate: '{page-title} ({date-iso} {time-locale}).html',
  infobarTemplate: '',
  filenameMaxLength: 192,
  filenameReplacementCharacter: '_',
  maxResourceSizeEnabled: false,
  maxResourceSize: 10,
  removeAudioSrc: true,
  removeVideoSrc: true,
  removeAlternativeFonts: true,
  removeAlternativeMedias: true,
  removeAlternativeImages: true,
  groupDuplicateImages: true,
  saveRawPage: false,
};


async function onTabUpdated(tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    const contentScript = `singlefile.extension.getPageData(${JSON.stringify(options)}).then(console.log)`;

    // eslint-disable-next-line no-undef
    await singlefile.extension.injectScript(tabId, options);
    await browser.tabs.executeScript(tabId, { code: contentScript, allFrames: false, runAt: 'document_idle' });
  }
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => onTabUpdated(tabId, changeInfo, tab));
