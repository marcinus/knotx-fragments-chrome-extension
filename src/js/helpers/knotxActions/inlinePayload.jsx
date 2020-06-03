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

import React from 'react';
import Raw from '../../components/Graphs/NodeInfo/displayOptions/raw/Raw';
import { ICONS } from '../constants';


export const inlinePayload = (logObj) => {
  const condition = (logObj.operation.factory === 'action' && logObj.operation.data.actionFactory === 'inline-payload');
  if (!condition) return false;

  const icon = ICONS.PAYLOAD;

  const unprocessed = logObj.status === 'UNPROCESSED';
  const previewTemplate = unprocessed
    ? () => ''
    : (nodeJson) => {
      const invocationsLength = nodeJson.response.invocations.length;
      const info = nodeJson.response.invocations[invocationsLength - 1].logs.value;
      return (<Raw nodeJson={info} />);
    };

  return {
    icon,
    previewTemplate,
  };
};
