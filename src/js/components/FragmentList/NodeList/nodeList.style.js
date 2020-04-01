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

export const NodeListWrapper = styled.div`
    display: ${({ expanded }) => (expanded ? 'block' : 'none')};
    margin-left: 32px;
    background-color: transparent;
`;

export const NodeButton = styled.button`
    border: 0;
    padding: 0 10px;
    width: 100%;
    font-size: 12px;
    text-align: start;
    height: 20px;
    margin: 1px;
    color: ${({ theme }) => theme.TEXT};
    background-color: ${({ theme }) => theme.NODE_LIST_ITEM_BG};

    &:hover {
        cursor: pointer;
    }
`;
