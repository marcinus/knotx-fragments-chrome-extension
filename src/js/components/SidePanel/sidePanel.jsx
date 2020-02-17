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

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { SidePanelWrapper, ToggleSidePanelButton } from './sidePanel.style';
import FragmentList from '../FragmentList/fragmentList';
import { HAMBURGER, CROSS } from '../../helpers/constants';
import { setSidebarExpanded } from '../../state/actions/pageData';

const SidePanel = ({ tabId }) => {
  const expanded = useSelector(({ pageData }) => pageData[tabId].sidebarExpanded);
  const renderedGraph = useSelector(({ pageData }) => pageData[tabId].renderedGraph);
  const dispatch = useDispatch();

  return (
    <SidePanelWrapper
      expanded={expanded}
      renderedGraph={renderedGraph}
    >
      <ToggleSidePanelButton
        shouldDisplay={renderedGraph !== null && renderedGraph !== undefined}
        expanded={expanded}
        onClick={() => {
          dispatch(
            setSidebarExpanded(
              {
                id: tabId,
                sidebarExpanded: !expanded,
              },
            ),
          );
        }}
      >
        {expanded ? CROSS : HAMBURGER}
      </ToggleSidePanelButton>
      <FragmentList tabId={tabId} />
    </SidePanelWrapper>
  );
};

SidePanel.propTypes = {
  tabId: PropTypes.number.isRequired,
};

export default SidePanel;
