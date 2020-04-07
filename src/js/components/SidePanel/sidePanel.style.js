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
    margin-left: ${({ expanded }) => (expanded ? '0' : '-100%')};
    top: 0;
    height: 100vh;
    width: 100%;
    z-index: 10;
    background-color: ${({ theme }) => theme.BACKGROUND};
    transition: left .1s, width .1s;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: ${PAGE_BREAK}px) {
        position: ${({ expanded, renderedGraph }) => {
    if (!expanded || !renderedGraph) return 'fixed';
    return 'relative';
  }};
        margin-left: ${({ expanded, renderedGraph }) => {
    if (!expanded && !renderedGraph) return '-100%';
    if (!expanded && renderedGraph) return '-35%';
    return '0';
  }};
        width: ${({ renderedGraph }) => (renderedGraph === null ? '100%' : '35%')}
    }
`;

export const ToggleSidePanelButton = styled.button`
    position: fixed;
    padding: 0;
    width: 41px;
    height: 41px;
    font-size: 18px;
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.MENU_TOGGLE_BUTTON};
    display: flex;
    justify-content: center;

    &:hover {
        cursor: pointer;
    }
`;

export const ToogleArrow = styled(ToggleSidePanelButton)`
    top: 0px;
    left: 0px;

    @media (min-width: ${PAGE_BREAK}px) {
        display: none;
    }
`;

export const ToogleBurger = styled(ToggleSidePanelButton)`
    top: 0px;
    left: 0px;

    @media (max-width: ${PAGE_BREAK}px) {
        display: none;
    }
`;

export const CloseSidePanelButton = styled.button`
    position: absolute;
    width: 41px;
    height: 41px;
    right: 0px;
    top: 0;
    border: none;
    background: ${({ theme }) => theme.BACKGROUND};
    color: ${({ theme }) => theme.TEXT};
    font-size: 18px;

    @media (max-width: ${PAGE_BREAK}px) {
      display: none;
    }

    &:hover {
        cursor: pointer;
    }
`;

export const SidePanelContent = styled.div`
    display: ${({ shouldDisplay }) => (shouldDisplay ? 'flex' : 'none')};
    height: 100vh;
    width: 100%;
    flex-direction: column;
`;
