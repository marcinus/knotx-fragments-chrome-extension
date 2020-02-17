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
    margin-left: 25px;
    border-left: 1px solid grey;
`;

export const NodeButton = styled.button`
    background-color: transparent;
    border: 0;
    width: 100%;
    font-size: 12px;
    color: ${({ theme }) => theme.textColor};
    text-align: start;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};

    &:hover {
        background-color: ${({ theme }) => theme.nodeHighlight};
    }

    &:nth-child(2n + 1) {
        background-color: ${({ theme }) => theme.oddNodeBgColor};

        &:hover {
            background-color: ${({ theme }) => theme.nodeHighlight};
        }
    }
`;
