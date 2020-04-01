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

export const LegendContainer = styled.div`
    height: 30%;
    width: 100%;
    overflow: scroll;
`;

export const LegendHeader = styled.h3`
    margin: 45px 15px 10px 15px;
`;

export const LegendItem = styled.div`
    display: flex;
    align-items: center;
    margin: 5px;
`;

export const LegendItemIcon = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px;
`;

export const SquareIcon = styled.div`
    background-color: ${({ color }) => color};
    width: 100%;
    height: 100%;
    border: 1px solid black;
`;

export const CircleIcon = styled.div`
    background-color: ${({ color }) => color};
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 50%;
`;

export const RectangleIcon = styled.div`
    background-color: ${({ color }) => color};
    width: 100%;
    height: 50%;
    border: 1px solid black;
    margin-top: 25%;
`;

export const LineIcon = styled.div`
    width: 100%;
    border: 1px;
    border-style: ${({ shape }) => shape};
    border-color: ${({ color }) => color};
    margin-top: 50%;
`;

export const LegendItemDescription = styled.span`
    font-weight: bold;
`;
