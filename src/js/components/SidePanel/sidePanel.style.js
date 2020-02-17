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
import { PAGE_BREAK } from '../../helpers/constants';

export const SidePanelWrapper = styled.div`
    position: fixed;
    left: ${({ expanded }) => (expanded ? '0' : '-100%')};
    top: 0;
    padding-top: 40px;
    height: 100vh;
    width: 100%;
    z-index: 1;
    background-color: ${({ theme }) => theme.sidePanelBgColor};
    transition: left .1s, width .1s;

    @media (min-width: ${PAGE_BREAK}px) {
        width: ${({ renderedGraph }) => (renderedGraph === null ? '100%' : '40%')}
    }
`;

export const ToggleSidePanelButton = styled.button`
    display: ${({ shouldDisplay }) => (shouldDisplay ? 'inline-block' : 'none')};
    position: fixed;
    left: ${({ expanded }) => (expanded ? '5px' : '0')};
    top: 0px;
    left: 0px;
    padding: 5px;
    width: 30px;
    font-size: 25px;
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.menuToggleButton};
    display: flex;
    justify-content: center;

    &:hover {
        cursor: pointer;
    }
`;
