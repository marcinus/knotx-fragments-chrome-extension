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

const isEmptyObject = (object) => object.constructor === Object && Object.entries(object).length === 0;

export const isReference = (node) => typeof node === 'string';

export const isComposite = (node) => node.type.toLowerCase() === 'composite';

export const getReference = (node) => node.id;

export const hasTransitions = (node) => !!node.on && !isEmptyObject(node.on);

export const hasTransition = (node, transitionName) => hasTransitions(node) && !!node.on[transitionName];

export const hasProcessedTransitions = (node) => hasTransitions(node)
  && Object.values(node.on)
    .filter((to) => !isReference(to))
    .some((to) => to.status.toLowerCase() !== 'unprocessed');

// https://github.com/Knotx/knotx-fragments/tree/master/engine#transition
// eslint-disable-next-line no-underscore-dangle
export const hasPreDefinedTransitions = (node) => hasTransitions(node) && !!node.on._success && !!node.on._error;
