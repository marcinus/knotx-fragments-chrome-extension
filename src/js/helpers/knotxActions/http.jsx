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
import { ICONS } from '../constants';
import HttpExecution from '../../components/Graphs/NodeInfo/displayOptions/http/HttpExecution';
import Raw from '../../components/Graphs/NodeInfo/displayOptions/raw/Raw';

const getIcon = (method) => {
  switch (method) {
    case 'get':
      return ICONS.GET;
    case 'post':
      return ICONS.POST;
    case 'put':
      return ICONS.PUT;
    case 'delete':
      return ICONS.DELETE;
    default:
      return ICONS.HTTP;
  }
};

export const http = (logObj) => {
  const condition = (
    logObj.operation.factory === 'action'
    && logObj.operation.data.actionFactory === 'http'
  );
  if (!condition) return false;

  const method = logObj.operation.data.actionConfig.httpMethod || 'get';
  const icon = getIcon(method);

  const unprocessed = logObj.status === 'UNPROCESSED';
  const executionTemplate = unprocessed
    ? false
    : (nodeJson) => (<HttpExecution nodeJson={nodeJson} />);

  const optionTemplate = (nodeJson) => {
    const info = nodeJson.operation.data.actionConfig;

    return (<Raw nodeJson={info} />);
  };

  const templates = [
    {
      name: 'execution',
      template: executionTemplate,
      default: true,
    },
    {
      name: 'options',
      template: optionTemplate,
      default: unprocessed,
    },
  ].filter((template) => template.template !== false);

  const defaultTemplate = unprocessed
    ? 'options'
    : 'execution';

  return {
    icon,
    templates,
    defaultTemplate,
  };
};
