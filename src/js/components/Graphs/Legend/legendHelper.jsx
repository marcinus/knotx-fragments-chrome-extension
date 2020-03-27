import {
  COLOR_SUCCESS, COLOR_ERROR, COLOR_OTHER, COLOR_UNPROCESSED, COLOR_MISSING,
} from '../../../helpers/graph/drawingHelper';

export const legendArrays = {
  nodes: [
    {
      desc: 'missing',
      color: COLOR_MISSING,
      shape: 'square',
    },
    {
      desc: 'unprocessed',
      color: COLOR_UNPROCESSED,
      shape: 'square',
    },
    {
      desc: 'success',
      color: COLOR_SUCCESS,
      shape: 'square',
    },
    {
      desc: 'error',
      color: COLOR_ERROR,
      shape: 'square',
    },
    {
      desc: 'other',
      color: COLOR_OTHER,
      shape: 'square',
    },
  ],
  composites: [
    {
      desc: 'startNode',
      color: 'white',
      shape: 'circle',
    },
    {
      desc: 'endNode',
      color: 'multi',
      shape: 'circle',
    },
  ],
  labels: [
    {
      desc: '_success',
      color: COLOR_SUCCESS,
      shape: 'rectangle',
    },
    {
      desc: '_error',
      color: COLOR_ERROR,
      shape: 'rectangle',
    },
    {
      desc: '_[custom]',
      color: COLOR_OTHER,
      shape: 'rectangle',
    },
  ],
  edges: [
    {
      desc: 'processed',
      color: 'black',
      shape: 'solid',
    },
    {
      desc: 'unprocessed',
      color: 'grey',
      shape: 'dashed',
    },
  ],
};
