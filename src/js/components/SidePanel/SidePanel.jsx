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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import {
  SidePanelWrapper,
  ToogleArrow,
  ToogleBurger,
  CloseSidePanelButton,
  SidePanelContent,
} from './sidePanel.style';
import FragmentList from '../FragmentList/FragmentList';
import FragmentGannt from '../FragmentGantt/FragmentGantt';
import { setSidePanelExpanded } from '../../state/actions/pageData';

const SidePanel = ({ tabId }) => {
  const renderedGraph = useSelector(({ pageData }) => pageData[tabId].renderedGraph);
  const sidePanelExpanded = useSelector(({ pageData }) => pageData[tabId].sidebarExpanded);

  const dispatch = useDispatch();

  return (
    <SidePanelWrapper
      expanded={sidePanelExpanded}
      renderedGraph={renderedGraph}
    >
      {!sidePanelExpanded
        ? (
          <>
            <ToogleArrow
              onClick={() => dispatch(setSidePanelExpanded({ id: tabId, sidebarExpanded: true }))}
            >
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </ToogleArrow>

            <ToogleBurger
              onClick={() => dispatch(setSidePanelExpanded({ id: tabId, sidebarExpanded: true }))}
            >
              <FontAwesomeIcon icon={faBars} />
            </ToogleBurger>
          </>
        )
        : null}

      <CloseSidePanelButton onClick={() => dispatch(setSidePanelExpanded({ id: tabId, sidebarExpanded: false }))}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseSidePanelButton>

      <SidePanelContent shouldDisplay={sidePanelExpanded}>
        <FragmentList tabId={tabId} />
        <FragmentGannt tabId={tabId} />
      </SidePanelContent>
    </SidePanelWrapper>
  );
};

SidePanel.propTypes = {
  tabId: PropTypes.number.isRequired,
};

export default SidePanel;
