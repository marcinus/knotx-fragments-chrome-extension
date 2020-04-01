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
import {
  COLOR_SUCCESS,
  COLOR_ERROR,
  COLOR_OTHER,
  COLOR_UNPROCESSED,
  COLOR_MISSING,
} from '../../helpers/graph/drawingHelper';
import { SquareIcon, CircleIcon, LegendItemIcon } from './Legend/legend.style';

export const nodeInfoToIcon = (nodeInfo) => {
  if (nodeInfo) {
    const colors = {
      SUCCESS: COLOR_SUCCESS,
      UNPROCESSED: COLOR_UNPROCESSED,
      ERROR: COLOR_ERROR,
      MISSING: COLOR_MISSING,
      OTHER: COLOR_OTHER,
    };

    if (nodeInfo.type === 'SINGLE') {
      return (
        <LegendItemIcon>
          <SquareIcon color={colors[nodeInfo.status]} />
        </LegendItemIcon>
      );
    }
    if (nodeInfo.type === 'COMPOSITE') {
      return (
        <LegendItemIcon>
          <CircleIcon color={colors[nodeInfo.status]} />
        </LegendItemIcon>
      );
    }
  }

  return true;
};
