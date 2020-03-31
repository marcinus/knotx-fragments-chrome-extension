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
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';
import {
  FragmentListWrapper,
  SortingButton,
  SortingWrapper,
  StatusSortingButton,
  EmptySortingCell,
  ListItemContainer,
} from './fragmentList.style';
import FragmentListItem from './FragmentListItem/fragmentListItem';

export function mapDataToComponents(fragments, tabId) {
  return fragments.map(({ debug, nodes }) => {
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
}

export function sortFragmentsByStatus(fragments) {
  const sortOrder = ['success', 'other', 'missing', 'unprocessed', 'error'];
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
}

const FragmentList = ({ tabId }) => {
  const data = useSelector((state) => state.pageData[tabId].fragments);
  const parsedData = mapDataToComponents(data, tabId);
  const [fragments, setFragments] = useState(parsedData);

  const typeSortComparator = (a, b) => a.props.type.localeCompare(b.props.type);
  const idSortComparator = (a, b) => a.props.id.localeCompare(b.props.id);

  return (
    <FragmentListWrapper>
      <h1>List of fragments</h1>

      <SortingWrapper>
        <StatusSortingButton
          onClick={() => setFragments(sortFragmentsByStatus(fragments))}
        >
          <FontAwesomeIcon icon={faLongArrowAltDown} />
        </StatusSortingButton>

        <SortingButton
          onClick={() => setFragments(fragments.concat().sort(idSortComparator))}
        >
          <span className="tableHeaderName">ID</span>
          <span className="tableHeaderIcon">
            <FontAwesomeIcon icon={faLongArrowAltDown} />
          </span>
        </SortingButton>

        <SortingButton
          onClick={() => setFragments(fragments.concat().sort(typeSortComparator))}
        >

          <span className="tableHeaderName">TYPE</span>
          <span className="tableHeaderIcon">
            <FontAwesomeIcon icon={faLongArrowAltDown} />
          </span>
        </SortingButton>

        <SortingButton
          onClick={() => setFragments(fragments.concat().sort())}
        >
          <span className="tableHeaderName">TIME</span>
          <span className="tableHeaderIcon">
            <FontAwesomeIcon icon={faLongArrowAltDown} />
          </span>
        </SortingButton>

        <EmptySortingCell />
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
