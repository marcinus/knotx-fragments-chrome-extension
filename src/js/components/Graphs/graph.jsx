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

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { drawGraph } from '../../helpers/graph/drawingHelper';
import { constructGraph } from '../../helpers/graph/declarationHelper';
import {
  GraphContainer,
  Graph,
} from './graph.style';

const selectors = {
  GRAPH: '.graphContainer .graph',
};

const GraphComponent = ({
  graphJson,
}) => {
  useEffect(() => {
    if (graphJson) {
      const graphDeclaration = constructGraph(graphJson);
      drawGraph(graphDeclaration, document.querySelector(selectors.GRAPH));
    }
  }, [graphJson]);

  return (
    <GraphContainer className="graphContainer">
      <Graph className="graph" />
    </GraphContainer>
  );
};


GraphComponent.defaultProps = {
  graphJson: null,
};

GraphComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  graphJson: PropTypes.object,
};


export default GraphComponent;
