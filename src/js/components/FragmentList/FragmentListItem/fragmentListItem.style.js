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
import {
  COLOR_SUCCESS,
  COLOR_ERROR,
  COLOR_OTHER,
  COLOR_UNPROCESSED,
  COLOR_MISSING,
} from '../../../helpers/graph/drawingHelper';

export const FragmentListItemContainer = styled.div`
    display: flex;
    color: ${({ theme }) => theme.TEXT};
    background-color: transparent;
    margin: 1px;
    height: 30px;
    align-items: center;
    font-size: 12px;

    & > * {
       background-color: ${({ active, theme }) => (active ? theme.TABLE_CELL_ACTIVE_BG : theme.TABLE_CELL_BG)};
    }

    &:hover, &:focus {
      & > * {
        background-color: ${({ theme }) => theme.TABLE_CELL_HOVER_BG};
      }
    }
`;

export const StatusWrapper = styled.div`
    height: 30px;
    width: 30px;
    margin: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ShowGraphButton = styled(StatusWrapper)`
    cursor: pointer;
`;

export const Status = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 4px;

    background-color: ${({ status }) => (status === 'success' ? COLOR_SUCCESS : '')};
    background-color: ${({ status }) => (status === 'error' ? COLOR_ERROR : '')};
    background-color: ${({ status }) => (status === 'unprocessed' ? COLOR_UNPROCESSED : '')};
    background-color: ${({ status }) => ((status === 'missing') ? COLOR_MISSING : '')};
    background-color: ${({ status }) => ((status === 'other') ? COLOR_OTHER : '')};
`;

export const TableItem = styled.div`
    flex: 1;
    display: inline-flex;
    height: 30px;
    margin: 1px;
    word-break: break-all;
    overflow: hidden;
    justify-content: center;
    align-items: center;
`;

export const TableItemId = styled(TableItem)`
  justify-content: space-between;

  .tableItemIcon,
  .tableItemContent {
    padding: 8px;
  }

  .tableItemIcon:hover {
    cursor: pointer;
  }

`;

export const Id = styled.div`
    overflow: hidden;
    flex: 1;
    border-right: 1px solid ${({ theme }) => theme.borderColor};
    display: flex;
    justify-content: center;
    flex-direction: column;
    word-break: break-all;
`;

export const IdHeader = styled.div`
    display: flex;
    justify-content: center;
    max-height: 20px;
`;

export const Type = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    border-right: 1px solid ${({ theme }) => theme.borderColor};
`;

export const Time = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`;

export const ExpandNodeListButton = styled.button`
    height: 19px;
    color: ${({ theme }) => theme.textColor};
    font-weight: bold;
    background-color: ${({ theme }) => theme.expandNodeListBg};;
    border: none;
    margin-left: 5px;

    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.expandNodeListBgHover};
    }
`;

export const OverflowWrapper = styled.p`
margin: 0;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
width: 100%;
text-align: center;
`;
