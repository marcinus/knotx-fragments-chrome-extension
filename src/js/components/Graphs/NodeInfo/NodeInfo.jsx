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
  const actionObj = detectActionType(nodeJson);

  const [activeOption, setActiveOption] = useState(actionObj.defaultTemplate);

  useEffect(() => {
    setActiveOption(actionObj.defaultTemplate);
  }, [nodeJson]);

  const createViewTabs = (templatesList) => {
    const rawTemplate = (
      <NodeInfoContainer
        id="raw-container"
        display={activeOption === 'raw' ? 'true' : 'false'}
      >
        <Raw nodeJson={nodeJson} />
      </NodeInfoContainer>
    );

    const rawDisplayOptionBtn = (
      <NodeInfoOption
        onClick={() => setActiveOption('raw')}
        type="button"
        active={activeOption === 'raw'}
      >
      RAW
      </NodeInfoOption>
    );

    const viewContainers = templatesList.map((template) => (
      <NodeInfoContainer
        key={template.name}
        id={template.name}
        display={activeOption === template.name ? 'true' : 'false'}
      >
        {template.template(nodeJson)}
      </NodeInfoContainer>
    ))
      .concat([rawTemplate]);

    const displayOptionButtons = templatesList.map((template) => (
      <NodeInfoOption
        key={template.name}
        type="button"
        active={activeOption === template.name}
        onClick={() => setActiveOption(template.name)}
      >
        {template.name.toUpperCase()}
      </NodeInfoOption>
    ))
      .concat([rawDisplayOptionBtn]);

    return {
      viewContainers,
      displayOptionButtons,
    };
  };


  const viewTabs = createViewTabs(actionObj.templates);

  return (
    <>
      { viewTabs.viewContainers }
      <NodeInfoOptionsBar>
        { viewTabs.displayOptionButtons }
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
