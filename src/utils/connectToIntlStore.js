// Passes IntlStore messages and locales down to Component as props.
//
// Example
//
//  let MyComponent = connectToIntlStore(React.createClass({
//    render() {
//      console.log(this.props.messages)
//    }
//  }))

import React, { PropTypes } from "react";

function connectToIntlStore(Component) {

  class IntlConnection extends React.Component {

    static contextTypes = {
      getStore: PropTypes.func.isRequired
    }

    render() {

      const intlStore = this.context.getStore("IntlStore");
      let intl = intlStore.getState();

      if (this.props.message) {
        intl.message = intlStore.getMessage(this.props.message);
      }

      return (
        <Component {...this.props} {...intl} />
      );
    }

  }

  return IntlConnection;
}

export default connectToIntlStore;
