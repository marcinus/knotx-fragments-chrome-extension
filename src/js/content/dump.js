
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


// eslint-disable-next-line no-undef
singlefile.extension.getPageData(options).then((response) => {
  const zip = new JSZip();
  zip.file('dump.html', response.cotent);
  zip.generateAsync({ type: 'blob' })
    .then((content) => {
      // eslint-disable-next-line no-undef
      saveAs(content, 'dump.zip');
    });
});
