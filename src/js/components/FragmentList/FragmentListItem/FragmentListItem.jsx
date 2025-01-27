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
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {
  FragmentListItemContainer,
  Status,
  NarrowTableItem,
  OverflowWrapper,
  TableItem,
  TableNameItem,
  ShowGraphButton,
} from './fragmentListItem.style';
import NodeList from '../NodeList/NodeList';
import { ENTER_KEY_CODE, PAGE_BREAK } from '../../../helpers/constants';
import { setRenderedGraph, setSidePanelExpanded } from '../../../state/actions/pageData';

const FragmentListItem = ({
  status, number, name, type, nodes, tabId, time,
}) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const activeFragment = useSelector(({ pageData }) => pageData[tabId].renderedGraph);

  function renderGraph() {
    dispatch(
      setRenderedGraph({
        id: tabId,
        renderedGraph: name,
      }),
    );
    if (window.innerWidth < PAGE_BREAK) {
      dispatch(setSidePanelExpanded({ id: tabId, sidebarExpanded: false }));
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
        isActive={name === activeFragment}
      >
        <NarrowTableItem>
          <Status status={status} />
        </NarrowTableItem>

        <NarrowTableItem>
          <OverflowWrapper>
            <span className="tableItemContent">
              {number}
            </span>
          </OverflowWrapper>
        </NarrowTableItem>

        <TableNameItem>
          <OverflowWrapper>
            <span className="tableItemContent">
              {name}
            </span>
          </OverflowWrapper>

          <span
            role="button"
            tabIndex="0"
            className="tableItemIcon"
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.keyCode === ENTER_KEY_CODE) {
                setExpanded(!expanded);
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded
              ? (<FontAwesomeIcon icon={faArrowUp} />)
              : (<FontAwesomeIcon icon={faArrowDown} />)}
          </span>
        </TableNameItem>

        <TableItem>
          <OverflowWrapper>
            <span className="tableItemContent">
              {type}
            </span>
          </OverflowWrapper>
        </TableItem>

        <TableItem>
          <OverflowWrapper>
            <span className="tableItemContent">
              {`${time}ms`}
            </span>
          </OverflowWrapper>
        </TableItem>

        <ShowGraphButton>
          <FontAwesomeIcon icon={faArrowCircleRight} tabIndex="0" />
        </ShowGraphButton>

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
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.object),
  tabId: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};

export default FragmentListItem;
