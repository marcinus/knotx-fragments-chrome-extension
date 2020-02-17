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
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  FragmentListItemContainer, Id, Status, StatusWrapper, Type, ExpandNodeListButton, IdHeader, Time, OverflowWrapper,
} from './fragmentListItem.style';
import NodeList from '../NodeList/nodeList';
import {
  ENTER_KEY_CODE, PAGE_BREAK, ARROW_DOWN, ARROW_UP,
} from '../../../helpers/constants';
import { setSidebarExpanded, setRenderedGraph } from '../../../state/actions/pageData';

const FragmentListItem = ({
  status, id, type, nodes, tabId, time,
}) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  function renderGraph() {
    dispatch(
      setRenderedGraph({
        id: tabId,
        renderedGraph: id,
      }),
    );

    if (window.innerWidth < PAGE_BREAK) {
      dispatch(
        setSidebarExpanded({
          id: tabId,
          sidebarExpanded: false,
        }),
      );
    }
  }

  return (
    <>
      <FragmentListItemContainer
        tabIndex="0"
        onClick={renderGraph}
        onKeyDown={(e) => {
          if (e.keyCode === ENTER_KEY_CODE) {
            renderGraph();
          }
        }}
        expanded={expanded}
      >
        <StatusWrapper>
          <Status status={status} />
        </StatusWrapper>
        <Id>
          <IdHeader>
            <OverflowWrapper>
              {id}
            </OverflowWrapper>

            <ExpandNodeListButton
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {expanded ? ARROW_UP : ARROW_DOWN}
            </ExpandNodeListButton>
          </IdHeader>
        </Id>
        <Type>{type}</Type>
        <Time>{`${time}ms`}</Time>
      </FragmentListItemContainer>
      <NodeList expanded={expanded}>{nodes}</NodeList>
    </>
  );
};

FragmentListItem.defaultProps = {
  nodes: [],
};

FragmentListItem.propTypes = {
  status: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.object),
  tabId: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};

export default FragmentListItem;
