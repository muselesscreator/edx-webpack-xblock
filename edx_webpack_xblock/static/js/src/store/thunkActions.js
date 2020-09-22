import StrictDict from 'libs/StrictDict';
import * as counterComms from 'comms/counter';
import { actions } from 'store';

/**
 * Simple thunk action that updates both the non-react xblock implementation as well
 * as updating the redux store for the React view.
 */
export const counter = StrictDict({
  updateCount: () => (dispatch, getState, { makeUrl, xblock }) => {
    counterComms.updateCount(makeUrl).then(result => {
      dispatch(actions.counter.load(result.data.count))
      xblock.updateCount(result.data);
    });
  },
});
