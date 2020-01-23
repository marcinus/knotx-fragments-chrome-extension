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
import vis from 'vis-network';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { drawGraph } from '../../helpers/graphsHelper';
import { getPageData } from '../../state/actions/pageData';

const exampleGraphDeclaration = {
  nodes: new vis.DataSet([
    {
      id: 'test1', label: 'root element', color: 'lightblue', level: 0,
    },
    { id: 2, label: 'Action', level: 1 },
    {
      id: 3, label: 'Subgraph start', level: 2, color: 'blue',
    },
    {
      id: 4, label: 'Error', level: 2, color: 'red',
    },
    { id: 5, label: 'Custom', level: 2 },
    {
      id: 6, label: 'Success', level: 3, color: 'lightgreen',
    },
    {
      id: 7, label: 'Error', level: 3, color: 'red', title: 'Sample tooltip text',
    },
    {
      id: 8, label: 'fallback', level: 4, color: 'red', title: 'Sample tooltip text',
    },
    {
      id: 9, label: 'Subgraph end', level: 5, color: 'blue', title: 'Sample tooltip text',
    },
  ]),
  edges: new vis.DataSet([
    { from: 'test1', to: 2 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 3, to: 7 },
    { from: 7, to: 8 },
    { from: 8, to: 9 },
    { from: 6, to: 9 },
  ]),
};

const ExampleGraph = ({
  pageUrl,
  // actions,
}) => {
  useEffect(() => {
    drawGraph(exampleGraphDeclaration);
  }, []);

  return (
    <div className="graphContainer">
      <h1>{ pageUrl }</h1>
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
    getPageData: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ pageData }) => ({
  pageUrl: pageData.url,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getPageData,
  },
  dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExampleGraph);
