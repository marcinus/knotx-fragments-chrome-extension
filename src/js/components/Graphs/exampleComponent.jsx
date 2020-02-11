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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { drawGraph } from '../../helpers/graph/drawingHelper';
import { setPageData } from '../../state/actions/pageData';
import { constructGraph } from '../../helpers/graph/declarationHelper';
import { graphJson } from './exampleComponent.mock';

const exampleGraphDeclaration = constructGraph(graphJson);

const ExampleGraph = ({
  pageUrl,
  tabId,
  // actions,
}) => {
  useEffect(() => {
    drawGraph(exampleGraphDeclaration, document.getElementById('exampleGraph'));
  }, []);

  return (
    <div className="graphContainer">
      <h1>{ pageUrl }</h1>
      <h1>{ tabId }</h1>
      <div
        id="exampleGraph"
        className="graph"
      />
    </div>
  );
};

ExampleGraph.propTypes = {
  pageUrl: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    setPageData: PropTypes.func.isRequired,
  }).isRequired,
  tabId: PropTypes.number.isRequired,
};

const mapStateToProps = ({ pageData }, ownProps) => ({
  pageUrl: pageData[ownProps.tabId].url,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setPageData,
  },
  dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExampleGraph);
