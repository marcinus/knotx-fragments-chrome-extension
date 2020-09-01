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

import React, { useEffect } from 'react';
// import MarkdownIt from 'markdown-it';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Container, CloseButon, Wrapper } from './docPage.style';
import { setDocPageLink } from '../../state/actions/pageData';
import '../../styling/markdown.css';

const showdown = require('showdown');

const converter = new showdown.Converter();
converter.setFlavor('github');
converter.setOption('openLinksInNewWindow', 'true');

const { themeName: chromeTheme } = chrome.devtools.panels;
const theme = chromeTheme === 'default' ? '' : 'dark';


const loadMarkdown = (path) => {
  const user = 'Knotx'; // TODO move to constants
  const repo = 'knotx-fragments-chrome-extension'; // TODO move to constants
  const url = `https://api.github.com/repos/${user}/${repo}/contents/${path}`;
  const myRequest = new Request(url, { headers: new Headers({ accept: 'application/vnd.github.v3.raw' }) });
  fetch(myRequest)
    .then((response) => {
      if (!response.ok) return '# There was error with your response, please check the details and try again';
      return response.text();
    })
    .then((response) => {
      document.getElementById('doc-page-container').innerHTML = converter.makeHtml(response);
    });
};

const DocPage = ({ tabId }) => {
  const dispatch = useDispatch();
  const docPageLink = useSelector(({ pageData }) => pageData[tabId].docPageLink);

  useEffect(() => {
    loadMarkdown(docPageLink);
  }, [docPageLink]);

  return (
    <Wrapper display={docPageLink}>
      <CloseButon onClick={() => dispatch(setDocPageLink({ id: tabId, docPageLink: '' }))}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseButon>
      <Container
        id="doc-page-container"
        className={`markdown-body ${theme}`}
      />
    </Wrapper>
  );
};

DocPage.propTypes = {
  tabId: PropTypes.number.isRequired,
};

export default DocPage;
