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

export const MainPanelWrapper = styled.div`
    flex: 1 1 auto;
`;

export const MainPanelContent = styled.div`
    display: flex;
    height: 100vh;

    @media (max-width: ${PAGE_BREAK}px) {
        flex-direction: column;
    }
`;
