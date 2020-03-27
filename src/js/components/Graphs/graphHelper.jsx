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
