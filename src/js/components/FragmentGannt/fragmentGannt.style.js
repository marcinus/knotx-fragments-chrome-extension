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

export const GanntContainer = styled.div`
    max-height: 50vh;
`;

export const TimelineBar = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.TABLE_HEADER_BG};
  cursor: pointer;

  span {
    font-size: 12px;
    font-weight: bold;
    color: ${({ theme }) => theme.TABLE_HEADER_TEXT};
    margin: 0 10px;
  }

  svg {
    color: ${({ theme }) => theme.TABLE_HEADER_TEXT};
    font-size: 14px;
    margin: 0 5px;
  }
`;

export const Timeline = styled.div`
  height: calc(50vh - 30px);
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};

  .vis-time-axis .vis-text {
    color: ${({ theme }) => theme.TEXT};
  }
`;
