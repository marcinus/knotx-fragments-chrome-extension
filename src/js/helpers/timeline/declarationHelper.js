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

import { DataSet } from 'vis-timeline';

const RADIX = 10;
const EMPTY_LABEL = '';

const hasSubtasks = (node) => !!node.subtasks;

const getNextNodes = (node) => node.on[node.response.transition];

const hasProcessedTransition = (node) => !!node.on && !!node.response && !!node.response.transition
  && !!getNextNodes(node);

export const generateUniqueLabel = (label, takenLabels) => {
  const usedLabels = takenLabels;

  if (usedLabels[label]) {
    usedLabels[label] += 1;
    return `${label} (#${usedLabels[label]})`;
  }

  usedLabels[label] = 1;
  return label;
};

export const getGraphWithUniqueLabels = (root, takenLabels = {}) => ({
  ...root,
  uniqueLabel: generateUniqueLabel(root.label, takenLabels),
  ...(root.on
    ? {
      on: Object.entries(root.on)
        .map(([transition, node]) => [transition, getGraphWithUniqueLabels(node, takenLabels)])
        .reduce((total, [transition, node]) => ({ ...total, [transition]: node }), {}),
    }
    : {}),
  ...(root.subtasks
    ? { subtasks: (root.subtasks).map((node) => getGraphWithUniqueLabels(node, takenLabels)) }
    : {}),
});

export const getProcessedNodes = (root, generateUniqueLabels = true) => {
  const rootNode = generateUniqueLabels ? getGraphWithUniqueLabels(root) : root;

  if (hasProcessedTransition(rootNode)) {
    return [rootNode, ...getProcessedNodes(getNextNodes(rootNode), false)];
  }

  if (rootNode.status.toLowerCase() !== 'missing') {
    return [rootNode];
  }

  return [];
};

const generateGroupName = (node) => node.uniqueLabel;

const generateSubgroupData = (parent) => (parent ? { subgroupOf: generateGroupName(parent) } : {});

const createTimelineItem = (node, parent) => ({
  id: node.id,
  start: parseInt(node.started, RADIX),
  end: parseInt(node.finished, RADIX),
  content: EMPTY_LABEL,
  group: generateGroupName(node),
  ...generateSubgroupData(parent),
});

export const createTimelineItems = (node, parent = null) => (hasSubtasks(node)
  ? [
    createTimelineItem(node, parent),
    ...node.subtasks
      .flatMap((subtask) => getProcessedNodes(subtask))
      .flatMap((subtask) => createTimelineItems(subtask, node))]
  : [
    createTimelineItem(node, parent),
  ]);

export const reduceSubgroups = (prev, { group, subgroupOf }) => {
  const total = { ...prev };

  if (subgroupOf) {
    total[subgroupOf] = [...total[subgroupOf], group];
  }

  total[group] = total[group] || [];

  return total;
};

export const extractGroupData = (items) => Object.entries(items.reduce(reduceSubgroups, {}))
  .map(([key, value]) => ({ name: key, subgroups: value }));

const createTimelineGroup = (name, index, subgroups) => ({
  id: name,
  order: index,
  content: name,
  nestedGroups: subgroups,
});

export const constructTimeline = (json) => {
  const items = getProcessedNodes(json)
    .flatMap((node) => createTimelineItems(node));

  const groups = extractGroupData(items)
    .map(({ name, subgroups }, index) => createTimelineGroup(name, index, subgroups.length ? subgroups : null));

  return { items: new DataSet(items), groups: new DataSet(groups) };
};
