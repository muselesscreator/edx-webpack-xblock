import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { applyMiddleware, createStore, compose } from 'redux';

import App from './App';
import reducer from './store';
import * as counterComms from 'comms/counter';
import { counter as counterURIs } from 'variables/uris';
import { actions } from 'store';

/**
 * Simple ES6 XBlock implementation
 * Initializes both a React and a non-React xblock example, to show how the 2 relate
 * to each other, and how you can do what you expect from a non-React implementation
 * simply with a React implementation as well.
 *
 * Tracks the redux store in order to allow the non-react handleElementClick event
 * to update the store, and provides a local updateCount method which is passed into
 * the redux store thunk instance as extra arguments, allowing the React/redux implementation
 * to communicate back to the non-React.
 *
 * Provides "starting-point" command, to be called with an xblock runtime, element, and
 * initial data.
 */
export class WebpackXBlock {
  constructor(runtime, element, data) {
    this.runtime = runtime;
    this.element = element;
    this.data = data;

    this.makeHandlerUrl = this.makeHandlerUrl.bind(this);
    this.initializeClickEvents = this.initializeClickEvents.bind(this);
    this.handleElementClick = this.handleElementClick.bind(this);
    this.initializeReact = this.initializeReact.bind(this);
    this.updateCount = this.updateCount.bind(this);

    this.initializeReact();
    this.initializeClickEvents();
  }

  makeHandlerUrl(uri) {
    return this.runtime.handlerUrl(this.element, uri);
  }

  updateCount(result) {
    $('.count', this.element).text(result.count);
  }

  initializeClickEvents() {
    $('p', this.element).click(this.handleElementClick);
  }

  handleElementClick(eventObject) {
    counterComms.updateCount(this.makeHandlerUrl).then(result => {
      console.log({ updatedCountData: result });
      this.updateCount(result.data);
      this.store.dispatch(actions.counter.load(result.data.count));
    });
  }


  initializeReact() {
    const globals = {
      makeUrl: this.makeHandlerUrl,
      xblock: this,
    }
    const thunkInstance = thunk.withExtraArgument(globals);
    this.store = createStore(reducer, compose(applyMiddleware(thunkInstance)));
    const rootElement = document.getElementById('webpack-xblock-react-root');
    ReactDOM.render(
      <Provider store={this.store}>
        <div className="webpack-xblock-react-wrapper">
          <App data={this.data}/>
        </div>
      </Provider>,
      rootElement
    )
  }
}

export const webpack_xblock = (runtime, element, data) => {
  const xblock = new WebpackXBlock(runtime, element, data);
}

export default webpack_xblock;
