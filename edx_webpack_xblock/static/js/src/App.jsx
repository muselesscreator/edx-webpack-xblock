import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '@edx/paragon';

import { selectors, actions, thunkActions } from 'store';

import './App.scss';

export class App extends Component {
  componentDidMount() {
    this.props.loadCount(this.props.data.count);
  }

  render() {
    return (
      <div className="webpack-xblock-react-app">
        <div className='app-header'>
          React App
        </div>
        The current count is {this.props.count} <br />
        <Button 
          onClick={this.props.updateCount}
          variant="primary"
        >
          Click me to increment!
        </Button>
      </div>
    )
  }
}
App.propTypes = {
  data: PropTypes.shape({
    count: PropTypes.number,
  }),
  //redux
  count: PropTypes.number,
  loadCount: PropTypes.func,
  updateCount: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  count: selectors.counter.value(state),
});

export const mapDispatchToProps = {
  loadCount: actions.counter.load,
  updateCount: thunkActions.counter.updateCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
