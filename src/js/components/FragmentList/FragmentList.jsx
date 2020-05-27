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
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import {
  FragmentListWrapper,
  SortingButton,
  SortingWrapper,
  StatusSortingButton,
  EmptySortingCell,
  ListItemContainer,
} from './fragmentList.style';
import FragmentListItem from './FragmentListItem/FragmentListItem';
import { FRAGMENT_LIST_HEADER, fragmentListTablesHeaders } from '../../helpers/constants';

export const mapDataToComponents = (fragments, tabId) => fragments.map(({ debug, nodes }) => {
  const { fragment } = debug;
  const duration = debug.finishTime - debug.startTime;
  return (
    <FragmentListItem
      key={fragment.id}
      id={fragment.id}
      status={debug.status.toLowerCase()}
      type={fragment.type}
      nodes={nodes}
      tabId={tabId}
      time={duration}
    />
  );
});

export const sortFragmentsByStatus = (fragments) => {
  const sortOrder = ['success', 'other', 'missing', 'unprocessed', 'failure'];
  const ordering = sortOrder.reduce((result, current, index) => (
    {
      ...result,
      [current]: index,
    }
  ), {});

  const sortedFragments = fragments.concat().sort((a, b) => (
    ordering[a.props.status] - ordering[b.props.status] || a.props.status.localeCompare(b.props.status)
  ));
  return sortedFragments;
};

const sortingOptions = {
  status: 'status',
  id: 'id',
  type: 'type',
  time: 'time',
};

const FragmentList = ({ tabId }) => {
  const data = useSelector((state) => state.pageData[tabId].fragments);

  let parsedData = mapDataToComponents(data, tabId);
  const [fragments, setFragments] = useState(parsedData);
  const [currentSorting, setCurrentSorting] = useState(null);

  const resetState = () => {
    setFragments(parsedData);
    setCurrentSorting(null);
  };

  const typeSortComparator = (a, b) => a.props.type.localeCompare(b.props.type);
  const idSortComparator = (a, b) => a.props.id.localeCompare(b.props.id);
  const timeSortComparator = (a, b) => a.props.time - b.props.time;

  useEffect(() => {
    parsedData = mapDataToComponents(data, tabId);
    resetState();
  }, [data]);

  return (
    <FragmentListWrapper>
      <h1>{FRAGMENT_LIST_HEADER}</h1>

      <SortingWrapper>
        <StatusSortingButton
          onClick={() => {
            if (currentSorting !== sortingOptions.status) {
              setFragments(sortFragmentsByStatus(fragments));
              setCurrentSorting(sortingOptions.status);
            } else {
              resetState();
            }
          }}
        >
          {currentSorting === sortingOptions.status
            ? (<FontAwesomeIcon icon={faLongArrowAltUp} />)
            : (<FontAwesomeIcon icon={faLongArrowAltDown} />)}
        </StatusSortingButton>

        <SortingButton
          onClick={() => {
            if (currentSorting !== sortingOptions.id) {
              setFragments(fragments.concat().sort(idSortComparator));
              setCurrentSorting(sortingOptions.id);
            } else {
              resetState();
            }
          }}
        >
          <span className="tableHeaderName">{fragmentListTablesHeaders.ID}</span>
          <span className="tableHeaderIcon">
            {currentSorting === sortingOptions.id
              ? (<FontAwesomeIcon icon={faLongArrowAltUp} />)
              : (<FontAwesomeIcon icon={faLongArrowAltDown} />)}
          </span>
        </SortingButton>

        <SortingButton
          onClick={() => {
            if (currentSorting !== sortingOptions.type) {
              setFragments(fragments.concat().sort(typeSortComparator));
              setCurrentSorting(sortingOptions.type);
            } else {
              resetState();
            }
          }}
        >
          <span className="tableHeaderName">{fragmentListTablesHeaders.TYPE}</span>
          <span className="tableHeaderIcon">
            {currentSorting === sortingOptions.type
              ? (<FontAwesomeIcon icon={faLongArrowAltUp} />)
              : (<FontAwesomeIcon icon={faLongArrowAltDown} />)}
          </span>
        </SortingButton>

        <SortingButton
          onClick={() => {
            if (currentSorting !== sortingOptions.time) {
              setFragments(fragments.concat().sort(timeSortComparator));
              setCurrentSorting(sortingOptions.time);
            } else {
              resetState();
            }
          }}
        >
          <span className="tableHeaderName">{fragmentListTablesHeaders.TIME}</span>
          <span className="tableHeaderIcon">
            {currentSorting === sortingOptions.time
              ? (<FontAwesomeIcon icon={faLongArrowAltUp} />)
              : (<FontAwesomeIcon icon={faLongArrowAltDown} />)}
          </span>
        </SortingButton>

        <EmptySortingCell tabIndex="-1" />

      </SortingWrapper>
      <ListItemContainer>
        {fragments}
      </ListItemContainer>
    </FragmentListWrapper>
  );
};

FragmentList.propTypes = {
  tabId: propTypes.number.isRequired,
};

export default FragmentList;
