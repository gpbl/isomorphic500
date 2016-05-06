// Pass messages and locales from IntlStore down to Component as props.
// It is basically used in the /utils/Formatted* utilities to avoid the use
// of the react-intl mixin. /utils/Formatted* utilities allow to pass message
// as string instead of using this.getIntlMessage() in the components.
//
// Example
//
//  let MyComponent = connectToIntlStore(React.createClass({
//    render() {
//      console.log(this.props.messages)
//    }
//  }))

import React, { PropTypes } from "react";
import { connectToStores } from "fluxible-addons-react";

function connectToIntlStore(Component) {

  @connectToStores([], (context, props) => {
    const intlStore = context.getStore("IntlStore");
    return {
      messages: intlStore.getMessages(),
      locales: intlStore.getLocales(),
      defaultMessage: props.id ? intlStore.getMessage(props.id) : null
    };
  })
  class IntlConnection extends React.Component {

    static PropTypes = {
      messages: PropTypes.object.isRequired,
      locales: PropTypes.array.isRequired,
      defaultMessage: PropTypes.string
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }

  }

  return IntlConnection;
}

export default connectToIntlStore;
