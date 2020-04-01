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
import { PAGE_BREAK } from '../../../helpers/constants';

export const RightNavBarContainer = styled.div`
    display: flex;
    background-color: ${({ theme }) => theme.sidePanelBgColor};

    @media (max-width: ${PAGE_BREAK}px) {
      flex-direction: column;
      justify-content: flex-end;
    }
`;

export const NavBar = styled.div`
    height: 100vh;
    width: 30px;
    background-color: grey;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;

    @media (max-width: ${PAGE_BREAK}px) {
      width: 100%;
      height: 30px;
      flex-direction: row;
    }
`;

export const NavBarItem = styled.span`
    writing-mode: vertical-rl;
    font-size: 20px;
    border-bottom: 1px solid black;
    background-color: gray;
    padding: 20px 0;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    @media (max-width: ${PAGE_BREAK}px) {
      writing-mode: horizontal-tb;
      border-right: 1px solid black;
      height: 100%;
      justify-content: center;
      padding: 0;
    }
`;

export const HideRightPanel = styled.span`
    font-size: 20px;
    border: 1px solid black;
    width: 100%;
    background-color: gray;
    text-align: center;
    cursor: pointer;

    @media (max-width: ${PAGE_BREAK}px) {
      height: 100%;
      width: 60px;
      border-right: 1px solid black;
    }
`;

export const RightPanel = styled.div`
    height: 100%;
    width: 30vw;
    display: ${({ showPanel }) => (showPanel ? 'block' : 'none')};
    overflow: scroll;

    @media (max-width: ${PAGE_BREAK}px) {
      width: 100%;
      height: 30vh;
    }
`;

export const LegendWrapper = styled.div`
    display: ${({ showLegend }) => (showLegend ? 'block' : 'none')};
`;

export const NodeInfoWrapper = styled.div`
    display: ${({ showNodeInfo }) => (showNodeInfo ? 'block' : 'none')};
    padding: 10px;
`;