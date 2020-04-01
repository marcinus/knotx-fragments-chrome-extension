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

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import {
  SidePanelWrapper,
  ToogleArrow,
  ToogleBurger,
  CloseSidePanelButton,
} from './sidePanel.style';
import FragmentList from '../FragmentList/fragmentList';
import { PAGE_BREAK } from '../../helpers/constants';
import FragmentGannt from '../FragmentGannt/fragmentGannt';

const SidePanel = ({ tabId }) => {
  const [expanded, setExpanded] = useState(true);
  const renderedGraph = useSelector(({ pageData }) => pageData[tabId].renderedGraph);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (window.innerWidth < PAGE_BREAK) {
      setExpanded(false);
    }
  }, [renderedGraph]);


  return (
    <SidePanelWrapper
      expanded={expanded}
      renderedGraph={renderedGraph}
    >
      {!expanded
        ? (
          <>
            <ToogleArrow
              onClick={() => setExpanded(true)}
            >
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </ToogleArrow>

            <ToogleBurger
              onClick={() => setExpanded(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </ToogleBurger>
          </>
        )
        : null}

      <CloseSidePanelButton onClick={() => setExpanded(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseSidePanelButton>

      <FragmentList tabId={tabId} />
      <FragmentGannt tabId={tabId} />
    </SidePanelWrapper>
  );
};

SidePanel.propTypes = {
  tabId: PropTypes.number.isRequired,
};

export default SidePanel;
