/**
 * Simple Redux store implementation (using connectReducers library)
 * provides an initial value of 0, with an action to load a new value, and
 * an associated selector (through simpleSelectors util)
 */
import { StrictDict } from 'libs/StrictDict';
import { action, mkReducer, simpleSelectors } from 'libs/redux-creators';
import { connectHandlers } from 'libs/connectReducers';

export const initialState = {
  value: 0,
}

export const actions = StrictDict({
  load: action('LOAD', ['value']),
});

export const actionHandlers = {
  load: (state, { value }) => ({ ...state, value }),
};

export const reducer = mkReducer(
  initialState,
  connectHandlers(actions, actionHandlers)
);

/**
 * simpleSelectors provides a selector for each key in the initial state object.
 */
export const selectors = StrictDict({
  ...simpleSelectors(initialState),
});
