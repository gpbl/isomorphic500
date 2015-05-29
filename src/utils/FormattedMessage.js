// Wrap react-intl's <FormattedMessage /> by passing messages and locales from the IntlStore
// Supports also the message props:
// Example         <FormattedMessage message="home.welcome" />

import { FormattedMessage } from "react-intl";
import connectToIntlStore from "../utils/connectToIntlStore";

export default connectToIntlStore(FormattedMessage);
