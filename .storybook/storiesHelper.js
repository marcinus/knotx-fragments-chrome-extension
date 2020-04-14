import { Provider } from 'react-redux';
import { store } from '../src/js/state/store';

export const withReduxSettings = (storeObj = {}, actionsArray = []) => ({
    Provider,
    store,
    state: storeObj,
    actions: actionsArray,
  });
