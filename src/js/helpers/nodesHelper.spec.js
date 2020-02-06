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

import {
  findFragmentsInContent, isFragmentBoundary, isFragmentNode, getFragmentId, isFragmentDataNode,
} from './nodesHelper';

const constructMarkupWithFragment = (id, debugData = '{}', nodes = '') => `
        <span>Not in fragment</span> 
        <!-- data-knotx-id="${id}" -->
        <script data-knotx-id="${id}" type="application/json">
        ${debugData}
        </script>
        ${Array.isArray(nodes) ? nodes.join('') : nodes}
        <!-- data-knotx-id="${id}" -->
        <span>Also not in fragment</span>
    `;

function constructMarkupWithFragments(...fragmentsData) {
  return fragmentsData
    .map((data) => constructMarkupWithFragment(data.id, data.debugData, data.nodes))
    .join();
}

beforeEach(() => {
  document.body.innerHTML = '';
});

test('Only comment nodes with KnotX id are recognized as fragment boundaries', () => {
  const comment = document.createComment('data-knotx-id');
  const commentWithId = document.createComment('data-knotx-id="test"');
  const spanWithId = document.createElement('span');

  spanWithId.appendChild(document.createTextNode('data-knotx-id="test"'));

  expect(isFragmentBoundary(comment)).toBe(false);
  expect(isFragmentBoundary(commentWithId)).toBe(true);
  expect(isFragmentBoundary(spanWithId)).toBe(false);
});

test('Only elements and non-empty text nodes are considered correct nodes', () => {
  const emptyElement = document.createElement('div');
  const text = document.createTextNode('Some text');
  const emptyText = document.createTextNode('\n\t ');
  const comment = document.createComment('Some comment');

  expect(isFragmentNode(emptyElement)).toBe(true);
  expect(isFragmentNode(text)).toBe(true);
  expect(isFragmentNode(emptyText)).toBe(false);
  expect(isFragmentNode(comment)).toBe(false);
});

test('KnotX id can be extracted from comments', () => {
  const commentWithId = document.createComment('data-knotx-id="ID"');
  const commentWithoutId = document.createComment('Some comment');

  expect(getFragmentId(commentWithId)).toBe('ID');
  expect(getFragmentId(commentWithoutId)).toBeUndefined();
});

test('Only script elements with KnotX id are considered data nodes', () => {
  const div = document.createElement('div');
  const script = document.createElement('script');
  const scriptWithId = document.createElement('script');

  scriptWithId.setAttribute('data-knotx-id', 'ID');

  expect(isFragmentDataNode(div, 'ID')).toBe(false);
  expect(isFragmentDataNode(script, 'ID')).toBe(false);
  expect(isFragmentDataNode(scriptWithId, 'ID')).toBe(true);
  expect(isFragmentDataNode(scriptWithId, 'different id')).toBe(false);
});

test('Empty DOM results in empty fragment array', () => {
  document.body.innerHTML = '';

  expect(findFragmentsInContent()).toStrictEqual([]);
});

test('DOM without fragments results in empty array', () => {
  document.body.innerHTML = '<div><span>Test</span></div>';

  expect(findFragmentsInContent()).toStrictEqual([]);
});

test('Fragment without data script tag is parsed', () => {
  document.body.innerHTML = `<span>Test</span>
        <!-- data-knotx-id="test" -->
        <div>Test fragment</div>
        <!-- data-knotx-id="test" -->`;

  expect(findFragmentsInContent()).toHaveLength(1);
});

test('Fragment with empty data is parsed', () => {
  document.body.innerHTML = constructMarkupWithFragment('test', '{}', '<div>Test fragment</div>');

  expect(findFragmentsInContent()).toHaveLength(1);
});

test('Empty fragment is parsed', () => {
  document.body.innerHTML = constructMarkupWithFragment('test');

  expect(findFragmentsInContent()).toHaveLength(1);
});

test('Fragment without json have empty object as debug property', () => {
  document.body.innerHTML = constructMarkupWithFragment('test', '', '<div>Test fragment</div>');

  const fragments = findFragmentsInContent();
  expect(fragments).toHaveLength(1);
  expect(fragments[0]).toHaveProperty('debug', {});
});

test('Fragment with incorrect json throws syntax error', () => {
  document.body.innerHTML = constructMarkupWithFragment('test', '{"test": "test"]', '<div>Test fragment</div>');

  const execution = () => findFragmentsInContent();
  expect(execution).toThrow(SyntaxError);
});

test('Multiple fragments can be parsed', () => {
  document.body.innerHTML = constructMarkupWithFragments(
    { id: 'frag1', debugData: '{}', nodes: '<div>Fragment 1</div>' },
    { id: 'frag2', debugData: '{}', nodes: '<div>Fragment 2</div>' },
    { id: 'frag3', debugData: '{}', nodes: '<div>Fragment 3</div>' },
  );

  const fragments = findFragmentsInContent();
  expect(fragments).toHaveLength(3);
});

test('Fragments contain list of root elements with fragment id each', () => {
  document.body.innerHTML = constructMarkupWithFragments(
    { id: 'test', debugData: '{}', nodes: '<div>Another fragment</div>' },
    {
      id: 'test2',
      debugData: '{}',
      nodes: [
        '<div>Test fragment</div>',
        '<div><span>Lorem ipsum</span></div>',
      ],
    },
  );

  const fragments = findFragmentsInContent();
  expect(fragments).toHaveLength(2);

  expect(fragments[0].nodes).toHaveLength(1);
  expect(fragments[0].nodes[0].dataset).toHaveProperty('knotxId', 'test');

  const { nodes } = fragments[1];
  expect(nodes).toHaveLength(2);
  nodes.forEach((element) => {
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.dataset).toHaveProperty('knotxId', 'test2');
  });
});

test('Empty fragment has empty nodes array', () => {
  document.body.innerHTML = constructMarkupWithFragment('test');

  const fragments = findFragmentsInContent();
  expect(fragments).toHaveLength(1);
  expect(fragments[0].nodes).toHaveLength(0);
});

test('Fragment includes text nodes', () => {
  document.body.innerHTML = constructMarkupWithFragment('test', '{}', [
    'A text node',
    '<div>Test fragment</div>',
    '<div><span>Lorem ipsum</span></div>',
    'Another text node',
  ]);

  const fragments = findFragmentsInContent();
  expect(fragments).toHaveLength(1);
  expect(fragments[0].nodes).toHaveLength(4);
});

test('Fragments can exist on different levels of nesting', () => {
  document.body.innerHTML = `
        ${constructMarkupWithFragment('nest0', '{}', '')}
        <div>
            ${constructMarkupWithFragment('nest1', '{}', '')}
            <div>${constructMarkupWithFragment('nest2', '{}', '')}</div>
        <div>
    `;

  const fragments = findFragmentsInContent();
  expect(fragments).toHaveLength(3);
});

test('Nodes keep original properties', () => {
  document.body.innerHTML = constructMarkupWithFragment('test', '{}', [
    '<div data-test="1234" width="100%">Test fragment</div>',
    '<div height="18px"><span>Lorem ipsum</span></div>',
  ]);

  const fragments = findFragmentsInContent();
  expect(fragments).toHaveLength(1);
  expect(fragments[0].nodes).toHaveLength(2);

  const [node1, node2] = fragments[0].nodes;

  expect(node1.dataset).toHaveProperty('test', '1234');
  expect(node1.getAttribute('width')).toBe('100%');
  expect(node2.getAttribute('height')).toBe('18px');
});

test('Nodes debug data is parsed as is', () => {
  const debugData = {
    testProps: 12,
    nested: {
      name: 'lorem ipsum',
      nested2: {
        prop: 42,
        emptyObject: {},
        emptyArray: [],
      },
      array: [
        11,
        { property: 'property' },
        [],
        null,
      ],
    },
  };

  document.body.innerHTML = constructMarkupWithFragment('test', JSON.stringify(debugData));

  const fragments = findFragmentsInContent();
  expect(fragments).toHaveLength(1);
  expect(fragments).toHaveLength(1);
  expect(fragments[0].debug).toStrictEqual(debugData);
});

test('Allow top level arrays as debug data', () => {
  const debugData = [12, { prop: 'prop' }, null];

  document.body.innerHTML = constructMarkupWithFragment('test', JSON.stringify(debugData));

  const fragments = findFragmentsInContent();
  expect(fragments).toHaveLength(1);
  expect(fragments[0].debug).toStrictEqual(debugData);
});

test('Fragments need to be closed', () => {
  document.body.innerHTML = `
        <span>Not in fragment</span> 
        <!-- data-knotx-id="test" -->
        <script data-knotx-id="test" type="application/json">
        {}
        </script>
        <div>This is not in a correct fragment</div>
        <div></div>
        <!-- data-knotx-id="diff-id" -->
        <span>This is also not in a correct fragment</span>
    `;

  const fragments = findFragmentsInContent();
  expect(fragments).toHaveLength(0);
});
