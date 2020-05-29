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

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NodeIndoContainer, NodeInfoOptionsBar, NodeInfoOption } from './nodeInfo.style';
import Raw from './displayOptions/raw/Raw';
import { detectActionType } from '../../../helpers/knotxActions/knotxActionsHelper';


const NodeInfo = ({ nodeJson }) => {
  const displayOptions = {
    raw: (<Raw nodeJson={nodeJson} />),
    preview: detectActionType(nodeJson).template(nodeJson),
    payload: 'payload',
    body: 'body',
  };

  const [displayOption, setDisplayOption] = useState(displayOptions.raw);

  useEffect(() => {
    setDisplayOption(displayOptions.raw);
  }, [nodeJson]);


  return (
    <>
      <NodeIndoContainer>
        {displayOption}
      </NodeIndoContainer>
      <NodeInfoOptionsBar>
        <NodeInfoOption
          onClick={() => setDisplayOption(displayOptions.raw)}
          type="button"
        >
          RAW
        </NodeInfoOption>
        <NodeInfoOption
          type="button"
          onClick={() => setDisplayOption(displayOptions.preview)}
        >
          PREVIEW
        </NodeInfoOption>
        <NodeInfoOption
          type="button"
          active
          onClick={() => setDisplayOption(displayOptions.payload)}
        >
          PAYLOAD
        </NodeInfoOption>
        <NodeInfoOption
          type="button"
          onClick={() => setDisplayOption(displayOptions.body)}
        >
          BODY
        </NodeInfoOption>
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
