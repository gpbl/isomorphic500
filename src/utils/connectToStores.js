
import React, { PropTypes } from "react";
import { FluxibleMixin } from "fluxible";

/**
 * Make a Component listen to fluxible stores and pass the object returned by
 * getState as props to Component.
 * This will likely be replaced by the fluxible's own implementation as
 * https://github.com/yahoo/fluxible/issues/70 is closed.
 *
 * Heavily inspired by this article from @dan_abramov
 * https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
 *
 * @param  {React.Component}  Component  The component that will listen to stores
 * @param  {Array[String]}    stores     The stores to listen to.
 * @param  {Function}         getState   A `function({...stores}, props)`
 *                                       returning the state of the stores to
 *                                       pass as props.
 * @return {React.Component}
 *
 * @example
 *
 *    class MyComponent extends React.Component {
 *
 *      render() {
 *        return <p>{ this.props.item }</p>
 *      }
 *    }
 *
 *    MyComponent = connectToStores(MyComponent, ["ItemStore"], (itemStore, props) => {
 *      return {
 *        item: itemStore.get(props.id)
 *      };
 *    });
 *
 *    export default MyComponent;
 */

function connectToStores(Component, stores, getState) {

  const StoreConnection = React.createClass({

    mixins: [FluxibleMixin],

    statics: {
      storeListeners: stores
    },

    getInitialState() {
      return this.getStateFromStores();
    },

    getStateFromStores() {
      const storesFromContext = stores.map(store => this.getStore(store));
      return getState(...storesFromContext, this.props);
    },

    onChange() {
      if (this.isMounted()) {
        this.setState(this.getStateFromStores());
      }
    },

    render() {
      return <Component {...this.state} {...this.props} />;
    }

  });

  return StoreConnection;
}

export default connectToStores;
