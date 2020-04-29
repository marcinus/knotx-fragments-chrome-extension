
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

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
  chromeConnections,
} from '../helpers/constants';

export const dumpOptions = {
  removeHiddenElements: false,
  removeUnusedStyles: false,
  removeUnusedFonts: false,
  removeFrames: false,
  removeImports: false,
  removeScripts: false,
  compressHTML: false,
  compressCSS: false,
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
  removeAudioSrc: false,
  removeVideoSrc: false,
  removeAlternativeFonts: false,
  removeAlternativeMedias: false,
  removeAlternativeImages: false,
  groupDuplicateImages: false,
  saveRawPage: false,
};

const getFullDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = today.getFullYear();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();

  return `${day}-${month}-${year}_${hour}-${min}-${sec}`;
};


// eslint-disable-next-line no-unused-vars
export const dump = () => {
  // eslint-disable-next-line no-undef
  singlefile.extension.getPageData(dumpOptions).then((response) => {
    const zip = new JSZip();
    zip.file(`${response.title}.html`, response.content);
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        saveAs(content, `dump_${getFullDate()}.zip`);
        const port = chrome.runtime.connect({ name: chromeConnections.KNOTX_DEVTOOL_CONNECTION });
        port.postMessage({ status: 'dump_complete' });
      });
  });
};
