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
