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
import { NodeInfoContainer, NodeInfoOptionsBar, NodeInfoOption } from './nodeInfo.styled';
import Raw from './displayOptions/raw/Raw';
import { detectActionType } from '../../../helpers/knotxActions/knotxActionsHelper';


const NodeInfo = ({ nodeJson }) => {
  const displayOptions = {
    raw: 'raw',
    preview: 'preview',
    payload: 'payload',
    body: 'body',
  };

  const [activeOption, setActiveOption] = useState(displayOptions.preview);

  const setDisplayOptionHandler = (displayName) => {
    switch (displayName) {
      case displayOptions.preview:
        setActiveOption(displayOptions.preview);
        break;
      case displayOptions.payload:
        setActiveOption(displayOptions.payload);
        break;
      case displayOptions.body:
        setActiveOption(displayOptions.body);
        break;
      default:
        setActiveOption(displayOptions.raw);
        break;
    }
  };

  useEffect(() => {
    setDisplayOptionHandler(displayOptions.preview);
  }, [nodeJson]);


  const actionObj = detectActionType(nodeJson);

  return (
    <>
      <NodeInfoContainer
        id="raw-container"
        display={activeOption === displayOptions.raw}
      >
        <Raw nodeJson={nodeJson} />
      </NodeInfoContainer>
      <NodeInfoContainer
        id="preview-container"
        display={activeOption === displayOptions.preview}
      >
        {actionObj.previewTemplate
          ? actionObj.previewTemplate(nodeJson)
          : '' }
      </NodeInfoContainer>
      <NodeInfoContainer
        id="payload-container"
        display={activeOption === displayOptions.payload}
      >
        {actionObj.payloadTemplate
          ? actionObj.payloadTemplate(nodeJson)
          : '' }
      </NodeInfoContainer>
      <NodeInfoContainer
        id="body-container"
        display={activeOption === displayOptions.body}
      >
        {actionObj.bodyTemplate
          ? actionObj.bodyTemplate(nodeJson)
          : '' }
      </NodeInfoContainer>

      <NodeInfoOptionsBar>
        <NodeInfoOption
          onClick={() => setDisplayOptionHandler('raw')}
          type="button"
          active={activeOption === 'raw'}
        >
          RAW
        </NodeInfoOption>
        <NodeInfoOption
          type="button"
          active={activeOption === 'preview'}
          onClick={() => setDisplayOptionHandler('preview')}
        >
          PREVIEW
        </NodeInfoOption>
        <NodeInfoOption
          type="button"
          active={activeOption === 'payload'}
          onClick={() => setDisplayOptionHandler('payload')}
        >
          PAYLOAD
        </NodeInfoOption>
        <NodeInfoOption
          type="button"
          onClick={() => setDisplayOptionHandler('body')}
          active={activeOption === 'body'}
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
