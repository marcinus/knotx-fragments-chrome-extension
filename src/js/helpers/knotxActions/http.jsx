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
import HttpPreview from '../../components/Graphs/NodeInfo/displayOptions/preview/http/HttpPreview';

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

export const http = (obj) => {
  const condition = (
    obj.operation.factory === 'action'
    && obj.operation.data.actionFactory === 'http'
  );
  if (!condition) return false;

  const method = obj.operation.data.actionConfig.httpMethod || 'get';
  const icon = getIcon(method);

  const unprocessed = obj.status === 'UNPROCESSED';
  const template = unprocessed
    ? () => ''
    : (nodeJson) => (<HttpPreview nodeJson={nodeJson} />);

  return {
    icon,
    template,
  };
};
