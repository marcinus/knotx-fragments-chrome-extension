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
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

export const LegendHeader = styled.h3`
    margin-bottom: 10px;
    margin-top: 0;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.TEXT};
`;

export const LegendSectionContainer = styled.div`
    width: calc(25% - 40px);
    margin: 20px;

    @media (max-width: 512px) {
      width: calc(50% - 40px);
    }
`;


export const LegendItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

export const LegendItemIcon = styled.div`
    width: 20px;
    height: 20px;
`;

export const SquareIcon = styled.div`
    background-color: ${({ color }) => color};
    width: 100%;
    height: 100%;
    border-radius: 4px;
`;

export const CircleIcon = styled.div`
    background-color: ${({ color }) => color};
    width: 100%;
    height: 100%;
    border: ${({ theme }) => `1px solid ${theme.BORDER}`};
    border-radius: 50%;
`;

export const RectangleIcon = styled.div`
    background-color: ${({ color }) => color};
    width: 100%;
    height: 100%;
    border-radius: 4px;
`;

export const LineIcon = styled.div`
    width: 100%;
    border: 1px;
    border-style: ${({ shape }) => shape};
    border-color: ${({ color }) => color};
    margin-top: 50%;
`;

export const LegendItemDescription = styled.span`
    font-size: 12px;
    margin-left: 5px;
    color: ${({ theme }) => theme.TEXT};
`;
