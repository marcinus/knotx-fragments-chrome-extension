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
import PropTypes from 'prop-types';
import renderjson from 'renderjson';
import { drawGraph } from '../../helpers/graph/drawingHelper';
import { constructGraph } from '../../helpers/graph/declarationHelper';
import {
  GraphContainer,
  Graph,
  PerformanceTimeLine,
  GraphHeader,
  GraphToogleViewButton,
  GraphNavigationWrapper,
} from './graph.style';
import TimelineComponent from './Timeline/timeline';

renderjson.set_icons('+', '-');
renderjson.set_show_to_level(1);

const displayOptions = {
  graph: 'graph',
  performanceTimeLine: 'performanceTimeLine',
};

const GraphComponent = ({
  graphJson,
  fragmentId,
}) => {
  const [displayOption, setDisplayOption] = useState(displayOptions.graph);
  const graphRef = useRef(null);

  useEffect(() => {
    if (graphJson) {
      const graphDeclaration = constructGraph(graphJson);
      const network = drawGraph(graphDeclaration, graphRef.current);

      setDisplayOption(displayOptions.graph);

      const nodeInfoContainer = document.getElementById('nodeInfo');
      nodeInfoContainer.innerHTML = '';

      network.on('click', (e) => {
        const nodeId = e.nodes[0];
        nodeInfoContainer.innerHTML = '';
        if (nodeId) {
          const { info } = graphDeclaration.nodes.find((el) => el.id === nodeId);

          nodeInfoContainer.appendChild(renderjson(info));
        }
      });
    }
  }, [graphJson]);

  return (
    <GraphContainer className="graphContainer">
      <GraphHeader>
        <h2>{`ID: ${fragmentId}`}</h2>
      </GraphHeader>
      <Graph ref={graphRef} shouldDisplay={displayOption} />
      <PerformanceTimeLine shouldDisplay={displayOption}>
        <TimelineComponent graphJson={graphJson} shouldDisplay={displayOption} />
      </PerformanceTimeLine>
      <GraphNavigationWrapper>
        <GraphToogleViewButton
          onClick={() => setDisplayOption(displayOptions.performanceTimeLine)}
        >
          PERFORMANCE VIEW
        </GraphToogleViewButton>
        <GraphToogleViewButton
          onClick={() => setDisplayOption(displayOptions.graph)}
        >
          GRAPH VIEW
        </GraphToogleViewButton>
      </GraphNavigationWrapper>
    </GraphContainer>
  );
};


GraphComponent.defaultProps = {
  graphJson: null,
  fragmentId: null,
};

GraphComponent.propTypes = {
  graphJson: PropTypes.instanceOf(Object),
  fragmentId: PropTypes.string,
};


export default GraphComponent;
