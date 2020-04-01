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

export const GraphContainer = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    width: 100%;

    @media (max-width: ${PAGE_BREAK}px) {
      height: 50%;
      flex: 1 1 auto;
    }
`;

export const Graph = styled.div`
     height: 50%;
     flex: 1 1 auto;
     display: ${({ shouldDisplay }) => (shouldDisplay === 'graph' ? 'block' : 'none')};
`;

export const PerformanceTimeLine = styled.div`
     height: 50%;
     flex: 1 1 auto;
     display: ${({ shouldDisplay }) => (shouldDisplay === 'performanceTimeLine' ? 'block' : 'none')};
`;

export const GraphHeader = styled.div`
    color: wheat;
    padding: 0 5px;
    margin-left: 40px;
`;

export const GraphNavigationWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const GraphToogleViewButton = styled.button`
    position: relative;
    bottom: 0;
    left: 50px;
    width: fit-content;
    border: 1px solid white;
    padding: 5px;
    font-size: 18px;
    color: red;
    margin: 0 10px;
`;

export const GraphFullScreenPanel = styled.div`
    position: fixed;
    z-index: 1;
    background-color: #242424;
    width: 100%;
    height: 100%;
    display: ${({ shouldDisplay }) => (shouldDisplay ? 'block' : 'none')};
`;
