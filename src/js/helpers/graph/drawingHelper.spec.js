import { Network } from 'vis-network';
import { drawGraph } from './drawingHelper';
import * as mock from './declarationHelper.mock';
import { constructGraph } from './declarationHelper';

test('drawing a graph returns a vis.Network object', () => {
  const mockElement = document.createElement('div');
  const graph = constructGraph(mock.singleNode);

  expect(drawGraph(graph, mockElement)).toBeInstanceOf(Network);
});
