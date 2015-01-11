import React from 'react';
import { StoreMixin } from 'fluxible-app';
import updateTime from '../actions/updateTime';
import TimeStore from '../stores/TimeStore';

const Timestamp = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: [TimeStore]
  },
  getInitialState: function () {
    return this.getStore(TimeStore).getState();
  },
  onChange: function () {
    var state = this.getStore(TimeStore).getState();
    this.setState(state);
  },
  handleTimeClick: function (event) {
    this.props.context.executeAction(updateTime);
  },
  render: function () {
    return (
      <em onClick={this.handleTimeClick}>
        {this.state.time}
      </em>
    )
  }
});

export default Timestamp;