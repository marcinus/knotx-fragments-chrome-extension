
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
import { getPageData } from '../state/actions/pageData';
import { store } from '../state/store';
import {
  status,
  succesMsgs,
  errorMsgs,
  REDUX_PORT,
} from '../helpers/constants';

wrapStore(store, { portName: REDUX_PORT });

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    const pageDataObj = {
      fragments: request.fragmentsData,
      url: sender.tab.url,
    };

    store.dispatch(getPageData(pageDataObj));

    const { pageData } = store.getState();
    if (pageData.fragments.length > 0 && pageData.url) {
      sendResponse({
        status: status.succes,
        msg: succesMsgs.getPageData,
      });
    } else {
      sendResponse({
        status: status.error,
        msg: errorMsgs.getPageData,
      });
    }
  },
);
