import { useMemo } from 'react';
import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import nftReducer from './nft/reducer';

let store;

const initStore = (initialState) =>
  createStore(
    combineReducers({
      NFTs: nftReducer
    }),
    initialState,
    compose(applyMiddleware(thunk))
  );

const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};

const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export { initializeStore };

export default useStore;
