
import React from "react";
import { FluxibleMixin } from "fluxible";

/**
 * Make a Component listen to fluxible stores and pass the object returned by
 * getState as props to Component.
 *
 * Heavily inspired by this article from @dan_abramov
 * https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
 *
 * @param  {React.Component}  Component  The component that will listen to stores
 * @param  {Array[String]}    stores     The stores to listen to.
 * @param  {Function}         getState   A `function({...stores}, props, context)`
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
      return getState(...storesFromContext, this.props, this.context);
    },

    onChange() {
      if (this.isMounted()) {
        this.setState(this.getStateFromStores());
      }
    },

    render() {
      return <Component {...this.props} {...this.state} context={this.context} />;
    }

  });

  return StoreConnection;
}

export default connectToStores;
