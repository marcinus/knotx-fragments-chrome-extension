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

import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import renderjson from 'renderjson';
import { NodeIndoContainer, NodeInfoOptionsBar, NodeInfoOption } from './nodeInfo.style';

renderjson.set_icons('+', '-');
renderjson.set_show_to_level(1);

const NodeInfo = ({ nodeJson }) => {
  const nodeInfo = useRef(null);

  useLayoutEffect(() => {
    nodeInfo.current.innerHTML = '';
    nodeInfo.current.appendChild(renderjson(nodeJson));
  }, [nodeJson]);

  return (
    <>
      <NodeIndoContainer ref={nodeInfo} />
      <NodeInfoOptionsBar>
        <NodeInfoOption type="button">RAW</NodeInfoOption>
        <NodeInfoOption type="button">PREVIEW</NodeInfoOption>
        <NodeInfoOption type="button" active>PAYLOAD</NodeInfoOption>
        <NodeInfoOption type="button">BODY</NodeInfoOption>
      </NodeInfoOptionsBar>
    </>
  );
};

NodeInfo.defaultProps = {
  nodeJson: null,
};

NodeInfo.propTypes = {
  nodeJson: PropTypes.instanceOf(Object),
};

export default NodeInfo;
