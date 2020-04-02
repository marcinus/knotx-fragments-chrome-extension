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

import styled from 'styled-components';

export const FragmentListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 50vh;
    flex: 1 1 auto;

    h1 {
      font-size: 18px;
      font-weight: bold;
      padding: 10px;
      margin: 0;
      color: ${({ theme }) => theme.TEXT};
    }

`;

export const SortingWrapper = styled.div`
    display: flex;
    height: 30px;
`;

export const SortingButton = styled.button`
    border: 0;
    margin: 1px;
    font-size: 12px;
    flex: 1;
    color: ${({ theme }) => theme.TABLE_HEADER_TEXT};
    background-color: ${({ theme }) => theme.TABLE_HEADER_BG};

    .tableHeaderIcon {
        float: right;
        cursor: pointer;
    }
`;

export const StatusSortingButton = styled(SortingButton)`
    flex: none;
    width: 30px;
`;

export const EmptySortingCell = styled(StatusSortingButton)``;

export const ListItemContainer = styled.div`
    height: 100%;
    overflow: scroll;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
`;
