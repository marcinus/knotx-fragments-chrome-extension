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

export const GraphWrapper = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;

    @media (max-width: ${PAGE_BREAK}px) {
      height: 50%;
      flex: 1 1 auto;
    }
`;

export const GraphContent = styled.div`
     height: calc(50% - 88px);
     flex: 1 1 auto;
     display: flex;
     margin-left: ${({ shouldDisplay }) => (shouldDisplay === 'performanceTimeLine' ? '-100%' : '0')};
     margin-right: ${({ shouldDisplay }) => (shouldDisplay === 'graph' ? '-100%' : '0')};
`;

export const GraphContainer = styled.div`
     height: 100%;
     width: 100%;
     visibility: ${({ shouldDisplay }) => (shouldDisplay === 'graph' ? 'visible' : 'hidden')};
`;

export const NodesGraph = styled.div`
     height: 100%;
`;

export const PerformanceTimeLineContainer = styled.div`
     height: 100%;
     width: 100%;
     flex: 1 1 auto;
     visibility: ${({ shouldDisplay }) => (shouldDisplay === 'performanceTimeLine' ? 'visible' : 'hidden')};
`;

export const GraphHeaderContainer = styled.div`
    margin-left: ${({ shouldHasMargin }) => (shouldHasMargin ? '40px' : 'inherit')};;
`;

export const GraphHeader = styled.h2`
    color: ${({ theme }) => theme.TEXT};
    padding-left: 5px;
    margin: 10px 0;
`;

export const GraphNavigationWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const GraphToogleViewButton = styled.button`
    width: 50%;
    padding: 15px 5px;
    font-size: 12px;
    color: ${({ theme }) => theme.TEXT};
    margin: 0;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.BORDER};
    border-bottom: ${({ theme, isActive }) => (isActive ? 'none' : `1px solid ${theme.BORDER}`)};
    border-top: ${({ theme, isActive }) => (isActive ? `1px solid ${theme.BORDER}` : 'none')};
    background-color: transparent;

    &:nth-child(1) {
      border-left: none;
      border-right: none;
    }

    &:nth-child(2) {
      border-right: none;
    }
`;

export const LegendIcon = styled.button`
    display: block;
    position: relative;
    float: right;
    bottom: 41px;
    height: 41px;
    width: 41px;
    border: none;
    padding: 0;
    font-size: 18px;
    color: ${({ theme }) => theme.TEXT};
    background-color: ${({ theme }) => theme.THEME_COLOR};

    &:hover {
        cursor: pointer;
    }
`;

export const GraphAdditionalPanel = styled.div`
    background-color: ${({ theme }) => theme.ADDITIONAL_PANEL_CONTENT_BG};
    width: 100%;
    border-top: ${({ theme }) => `1px solid ${theme.BORDER}`};
    display: ${({ shouldDisplay }) => (shouldDisplay ? 'block' : 'none')};
    min-height: 25%;
    height: 50%;
`;

export const GraphAdditionalPanelHeader = styled.div`
    position: fixed;
    background-color: ${({ theme }) => theme.ADDITIONAL_PANEL_HEADER_BG};
    width: 100%;
    color: ${({ theme }) => theme.TEXT};
    display: inline-flex;
    align-items: center;

    h2 {
      display: inline-flex;
      font-size: 18px;
      font-weight: 400;
      margin: 10px;

      span {
        padding: 0 10px;
      }
    }
`;

export const GraphAdditionalPanelContent = styled.div`
    margin-top: 41px;
    height: calc(100% - 41px);
`;

export const GraphAdditionalPanelCloseButton = styled.div`
    position: fixed;
    width: 41px;
    height: 41px;
    right: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: ${({ theme }) => theme.TEXT};

    &:hover {
        cursor: pointer;
    }
`;
