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

export const Wrapper = styled.div`
    width: 100vw;
    height: 100%;
    position: fixed;
    z-index: 10;
    display: ${({ display }) => (display !== '' ? 'block' : 'none')};
`;

export const CloseButon = styled.div`
    position: absolute;
    z-index: 100;
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: center;
    top: 10px;
    right: 50px;
    color: ${({ theme }) => theme.DOC_TEXT};
    font-size: 25px;
    cursor: pointer;
    border: 3px solid ${({ theme }) => theme.DOC_TEXT};;
    border-radius: 50%;
    padding: 5px;
    background-color: ${({ theme }) => theme.DOC_BG};
`;

export const Container = styled.div`
    width: calc(100vw - 100px);
    height: calc(100% - 100px);
    padding: 50px;
    position: fixed;
    z-index: 10;
    overflow: scroll;
    color: ${({ theme }) => theme.DOC_TEXT};
    background-color: ${({ theme }) => theme.DOC_BG};
`;

export const DocLink = styled.span`
    position: absolute;
    z-index: 100;
    bottom: 0;
    right: 50px;
    background-color: ${({ theme }) => theme.DOC_BG};
    color: ${({ theme }) => theme.DOC_TEXT};
    font-weight: bold;
    padding: 5px;
    text-transform: uppercase;
    font-size: 15px;
    border: 3px solid ${({ theme }) => theme.DOC_TEXT};
    border-bottom: 0px;
    border-radius: 3px 3px 0 0;
`;
