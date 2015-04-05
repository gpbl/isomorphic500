// Wraps FormattedDate with IntlStore
//
// TOFIX: this would create a store listeners each time we use FormattedDate.
// Wait for an improved API from fluxibile before using this in production!

import { FormattedDate } from "react-intl";
import { connectToStores } from "fluxible/addons";

export default connectToStores(FormattedDate, ["IntlStore"], {
  IntlStore: (store) => ({ locales: store.getLocales() })
});
