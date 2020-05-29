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


export const PreviewWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const PreviewContainer = styled.div`
    height: calc(100% - 20px);
    width: 100%;
    display: flex;
`;

export const RequestContainer = styled.div`
    height: 100%;
    width: 50%;
    padding: 0 10px;
    border-right: ${({ theme }) => `1px solid ${theme.BORDER}`};

    h2 {
        width: 100%;
        height: 30px;
        margin:  5px 0 15px 0;
        color:${({ theme }) => theme.TEXT};
        font-weight: 400;
    }

    div {
        height: calc(100% - 60px);
        width: 100%;
    }
`;

export const ResponseContainer = styled.div`
    height: 100%;
    width: 50%;
    padding: 0 10px;

    h2 {
        width: 100%;
        height: 30px;
        margin:  5px 0 15px 0;
        color:${({ theme }) => theme.TEXT};
        font-weight: 400;

    }

    div {
        height: calc(100% - 60px);
        width: 100%;
    }
`;

export const LoopBar = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: flex-end;

    button {
        margin: 0 2px;
        border: 1px solid black;
        border-radius: 3px;
        cursor: pointer;
    }
`;
