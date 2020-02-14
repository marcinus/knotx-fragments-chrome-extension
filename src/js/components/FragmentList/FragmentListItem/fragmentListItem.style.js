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

export const FragmentListItemWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ expanded, theme }) => (expanded ? theme.fragmentHighlight : '')};

    &:nth-child(2n + 1) {
        background-color: ${({ theme }) => theme.oddFragmentBgColor};;
        background-color: ${({ expanded, theme }) => (expanded ? theme.fragmentHighlight : '')};
    }

    &:hover, &:focus{
        background-color: ${({ theme }) => theme.fragmentHighlight};
    }
`;

export const StatusWrapper = styled.div`
    height: 15px;
    width: 15px;
    margin: 2px;
`;

export const Status = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;

    background-color: ${({ status }) => (status === 'success' ? '#01a101' : '')};
    background-color: ${({ status }) => (status === 'error' ? '#ff0000' : '')};
    background-color: ${({ status }) => (status === 'unprocessed' ? '#a7a7a7' : '')};
    background-color: ${({ status }) => ((status === 'other' || status === 'missing') ? '#ffbb00' : '')};
`;

export const Id = styled.div`
    overflow: hidden;
    flex: 1;
    border-right: 1px solid ${({ theme }) => theme.borderColor};
`;

export const Type = styled.div`
    flex: 1;
`;
