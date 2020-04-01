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
  StatusWrapper,
  OverflowWrapper,
  TableItem,
  TableItemId,
  ShowGraphButton,
} from './fragmentListItem.style';
import NodeList from '../NodeList/nodeList';
import { ENTER_KEY_CODE } from '../../../helpers/constants';
import { setRenderedGraph } from '../../../state/actions/pageData';

const FragmentListItem = ({
  status, id, type, nodes, tabId, time,
}) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const activeFragment = useSelector(({ pageData }) => pageData[tabId].renderedGraph);

  function renderGraph() {
    dispatch(
      setRenderedGraph({
        id: tabId,
        renderedGraph: id,
      }),
    );
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
        isActive={id === activeFragment}
      >
        <StatusWrapper>
          <Status status={status} />
        </StatusWrapper>

        <TableItemId>
          <OverflowWrapper>
            <span className="tableItemContent">
              {id}
            </span>
          </OverflowWrapper>

          <span
            role="button"
            tabIndex="0"
            onKeyDown={(e) => e.stopPropagation()}
            className="tableItemIcon"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded
              ? (<FontAwesomeIcon icon={faArrowUp} />)
              : (<FontAwesomeIcon icon={faArrowDown} />)}
          </span>
        </TableItemId>

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
          <FontAwesomeIcon icon={faArrowCircleRight} />
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
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.object),
  tabId: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};

export default FragmentListItem;
