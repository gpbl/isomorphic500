// Wrap react-intl's components by passing messages and locales from the IntlStore
// Supports also the message props:
// Example
//
//    <FormattedMessage id="home.welcome" />

import { FormattedMessage, FormattedDate, FormattedNumber, FormattedRelative }
  from "react-intl";
import connectToIntlStore from "../utils/connectToIntlStore";

export default {
  FormattedMessage: connectToIntlStore(FormattedMessage),
  FormattedDate: connectToIntlStore(FormattedDate),
  FormattedNumber: connectToIntlStore(FormattedNumber),
  FormattedRelative: connectToIntlStore(FormattedRelative)
};
