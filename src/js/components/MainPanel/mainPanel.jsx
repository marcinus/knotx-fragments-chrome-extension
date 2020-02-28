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

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { MainPanelWrapper } from './mainPanel.style';
import GraphComponent from '../Graphs/graph';

const MainPanel = ({ tabId }) => {
  const renderedGraphId = useSelector(({ pageData }) => pageData[tabId].renderedGraph);
  const sidebarExpanded = useSelector(({ pageData }) => pageData[tabId].sidebarExpanded);
  const graphData = useSelector(({ pageData }) => (renderedGraphId
    ? pageData[tabId].fragments.find((el) => el.debug.fragment.id === renderedGraphId).debug.graph
    : null));

  return graphData
    ? (
      <MainPanelWrapper sidebarExpanded={sidebarExpanded}>
        <h1>
          { renderedGraphId }
        </h1>
        <GraphComponent
          graphJson={graphData}
        />
      </MainPanelWrapper>
    )
    : (
      <MainPanelWrapper sidebarExpanded={sidebarExpanded}>
        <h1>
          Please Choose any fragment
        </h1>
      </MainPanelWrapper>
    );
};

MainPanel.propTypes = {
  tabId: PropTypes.number.isRequired,
};

export default MainPanel;
