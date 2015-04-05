
// Wraps FormattedMessage with IntlStore and make easier to get the IntlMessage:
//
// <FormattedMessage message="path.to.message" />
//
// TOFIX: this would create a store listeners each time we use FormattedMessage.
// Wait for an improved API from fluxibile before using this in production!

import { FormattedMessage } from "react-intl";
import { connectToStores } from "fluxible/addons";

export default connectToStores(FormattedMessage, ["IntlStore"], {
  IntlStore: (store, props) => ({
    locales: store.getLocales(),
    message: store.getMessage(props.message)
  })
});
