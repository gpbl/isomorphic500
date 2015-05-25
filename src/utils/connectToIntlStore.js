// Pass messages and locales from IntlStore down to Component as props.
// It is basically used in the /utils/Formatted* utilities.
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
      let intl = intlStore.getState(); // returns { locales, messages }

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
