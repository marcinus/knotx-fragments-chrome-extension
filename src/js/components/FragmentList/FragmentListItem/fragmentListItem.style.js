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

export const FragmentListItemContainer = styled.div`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ active, theme }) => (active ? theme.fragmentActive : '')};
    margin: 1px;
    min-height: 40px;
    align-items: center;
    font-size: 14px;

    &:nth-child(2n + 1) {
        background-color: ${({ theme }) => theme.oddFragmentBgColor};
        background-color: ${({ expanded, theme }) => (expanded ? theme.fragmentHighlight : '')};
    }

    &:hover, &:focus{
        background-color: ${({ theme }) => theme.fragmentHighlight};
    }
`;

export const StatusWrapper = styled.div`
    height: 25px;
    width: 25px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Status = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;

    background-color: ${({ status, theme }) => (status === 'success' ? theme.success : '')};
    background-color: ${({ status, theme }) => (status === 'error' ? theme.error : '')};
    background-color: ${({ status, theme }) => (status === 'unprocessed' ? theme.unprocessed : '')};
    background-color: ${({ status, theme }) => ((status === 'other' || status === 'missing') ? theme.warning : '')};
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
`;
