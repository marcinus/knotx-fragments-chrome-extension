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

export const FragmentListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const SortingWrapper = styled.div`
    display: flex;
`;

export const SortingButton = styled.button`
    border: 0;
    margin: 2px;
    padding: 2px;
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.buttonBgColor};
    &:active {
        background-color: ${({ theme }) => theme.fragmentHighlight};
    }
    flex: ${({ status }) => (status ? '' : 1)};
    width: ${({ status }) => (status ? '15px' : '')};
`;
