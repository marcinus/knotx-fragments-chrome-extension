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

import React, { useState } from 'react';
import {
  RightNavBarContainer,
  NavBar,
  RightPanel,
  NavBarItem,
  HideRightPanel,
  LegendWrapper,
  NodeInfoWrapper,
} from './navbar.style';
import Legend from '../../Graphs/Legend/Legend';

const navbarOptions = {
  nodeInfo: 'nodeInfo',
  legend: 'legend',
};

const RightNavBar = () => {
  const [currentOption, setCurrentOption] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const tooglePanel = (open, option) => {
    if (!open) {
      setExpanded(open);
      setCurrentOption(null);
    } else {
      setExpanded(open);
      setCurrentOption(option);
    }
  };

  return (
    <RightNavBarContainer>
      <RightPanel showPanel={expanded}>
        <NodeInfoWrapper
          id="nodeInfo"
          showNodeInfo={currentOption === navbarOptions.nodeInfo}
        />
        <LegendWrapper
          showLegend={currentOption === navbarOptions.legend}
        >
          <Legend />
        </LegendWrapper>

      </RightPanel>
      <NavBar>
        <HideRightPanel
          onClick={() => tooglePanel(false)}
        >
          -
        </HideRightPanel>
        <NavBarItem
          onClick={() => tooglePanel(true, navbarOptions.nodeInfo)}
        >
          info
        </NavBarItem>
        <NavBarItem
          onClick={() => tooglePanel(true, navbarOptions.legend)}
        >
          Legend
        </NavBarItem>
      </NavBar>
    </RightNavBarContainer>
  );
};

export default RightNavBar;
