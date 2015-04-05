import { FormattedNumber } from "react-intl";
import { connectToStores } from "fluxible/addons";

// TOFIX: this would create a store listeners each time we use FormattedMessage.
// Wait for an improved API from fluxibile before using this in production!

export default connectToStores(FormattedNumber, ["IntlStore"], {
  IntlStore: (store) => store.getState()
});
