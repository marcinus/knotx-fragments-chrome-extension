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

/* eslint no-new: 0 */

import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { drawGraph } from '../../helpers/graph/drawingHelper';
import { constructGraph } from '../../helpers/graph/declarationHelper';
import {
  GraphWrapper,
  GraphContainer,
  Graph,
  PerformanceTimeLineContainer,
  GraphHeader,
  GraphHeaderContainer,
  GraphToogleViewButton,
  GraphNavigationWrapper,
  GraphAdditionalPanel,
  GraphAdditionalPanelHeader,
  GraphAdditionalPanelCloseButton,
  GraphAdditionalPanelContent,
  LegendIcon,
} from './graph.style';
import TimelineComponent from './Timeline/timeline';
import Legend from './Legend/Legend';
import NodeInfo from './NodeInfo/nodesInfo';
import { nodeInfoToIcon } from './graphHelper';
import { LEGEND_PANEL_HEADER, NODE_INFO_PANEL_HEADER, graphNavigation } from '../../helpers/constants';

const displayOptions = {
  graph: 'graph',
  performanceTimeLine: 'performanceTimeLine',
};

const GraphComponent = ({
  fragmentId,
  tabId,
}) => {
  const [displayOption, setDisplayOption] = useState(displayOptions.graph);
  const [displayLegend, setDisplayLegend] = useState(false);
  const [nodeInfo, setNodeInfo] = useState(null);
  const [displayNodeInfo, setDisplayNodeInfo] = useState(false);
  const graphRef = useRef(null);

  const graphData = useSelector(({ pageData }) => (
    pageData[tabId].fragments.find((el) => el.debug.fragment.id === fragmentId).debug.graph
  ));
  const sidePanelExpanded = useSelector(({ pageData }) => pageData[tabId].sidebarExpanded);

  useEffect(() => {
    const graphDeclaration = constructGraph(graphData);
    const network = drawGraph(graphDeclaration, graphRef.current);

    setDisplayOption(displayOptions.graph);
    setDisplayNodeInfo(false);

    network.on('click', (e) => {
      const nodeId = e.nodes[0];
      if (nodeId) {
        const { info } = graphDeclaration.nodes.find((el) => el.id === nodeId);
        setDisplayNodeInfo(true);
        setNodeInfo(info);
      }
    });
  }, [fragmentId]);

  const handleSwitchView = (option) => {
    setDisplayOption(option);
    setDisplayNodeInfo(false);
    setDisplayLegend(false);
  };

  return (
    <GraphWrapper className="graphWrapper">
      <GraphHeaderContainer shouldHasMargin={!sidePanelExpanded}>
        <GraphHeader>
          {`ID: ${fragmentId}`}
        </GraphHeader>
      </GraphHeaderContainer>

      <GraphNavigationWrapper>
        <GraphToogleViewButton
          isActive={displayOption === displayOptions.graph}
          onClick={() => handleSwitchView(displayOptions.graph)}
        >
          {graphNavigation.GRAPH_VIEW}
        </GraphToogleViewButton>
        <GraphToogleViewButton
          isActive={displayOption === displayOptions.performanceTimeLine}
          onClick={() => handleSwitchView(displayOptions.performanceTimeLine)}
        >
          {graphNavigation.PERFORMANCE_VIEW}
        </GraphToogleViewButton>
      </GraphNavigationWrapper>

      <GraphContainer shouldDisplay={displayOption}>
        <Graph ref={graphRef} />
        <LegendIcon onClick={() => setDisplayLegend(true)}>
          <FontAwesomeIcon icon={faInfoCircle} />
        </LegendIcon>
      </GraphContainer>
      <PerformanceTimeLineContainer shouldDisplay={displayOption}>
        <TimelineComponent graphJson={graphData} shouldDisplay={displayOption} />
      </PerformanceTimeLineContainer>

      <GraphAdditionalPanel shouldDisplay={displayNodeInfo}>
        <GraphAdditionalPanelCloseButton onClick={() => setDisplayNodeInfo(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </GraphAdditionalPanelCloseButton>
        <GraphAdditionalPanelHeader>
          <h2>
            {nodeInfoToIcon(nodeInfo)}
            <span>{NODE_INFO_PANEL_HEADER}</span>
          </h2>
        </GraphAdditionalPanelHeader>
        <GraphAdditionalPanelContent>
          <NodeInfo nodeJson={nodeInfo} />
        </GraphAdditionalPanelContent>
      </GraphAdditionalPanel>

      <GraphAdditionalPanel shouldDisplay={displayLegend}>
        <GraphAdditionalPanelCloseButton onClick={() => setDisplayLegend(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </GraphAdditionalPanelCloseButton>
        <GraphAdditionalPanelHeader>
          <h2>{LEGEND_PANEL_HEADER }</h2>
        </GraphAdditionalPanelHeader>
        <GraphAdditionalPanelContent>
          <Legend />
        </GraphAdditionalPanelContent>
      </GraphAdditionalPanel>

    </GraphWrapper>
  );
};

GraphComponent.propTypes = {
  fragmentId: PropTypes.string.isRequired,
  tabId: PropTypes.number.isRequired,
};

export default GraphComponent;
