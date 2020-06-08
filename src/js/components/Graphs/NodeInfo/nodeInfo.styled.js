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

export const NodeInfoContainer = styled.div`
    padding: 5px;
    height: calc(100% - 25px);
    box-sizing: border-box;
    display:${({ display }) => (display === 'true' ? 'inherit' : 'none')};
`;

export const NodeInfoOptionsBar = styled.div`
    height: 25px;
    width: 100%;
    background-color: ${({ theme }) => theme.ADDITIONAL_PANEL_HEADER_BG};
    display: flex;
    flex-direction: row;
`;

export const NodeInfoOption = styled.button`
    border: 0;
    width: 100px;
    background-color: ${({ theme }) => theme.ADDITIONAL_PANEL_HEADER_BG};
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};;
    color: ${({ theme }) => theme.TEXT};
    border-right: ${({ theme }) => `1px solid ${theme.BORDER}`};
    border-top: ${({ theme, active }) => (active ? `1px solid ${theme.BORDER}` : 0)};
    font-family: 'Lato',sans-serif;

    &:hover {
        cursor: pointer;
    }
`;
