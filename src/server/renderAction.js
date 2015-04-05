import actionUtils from "fluxible-action-utils/async";

import { navigateAction } from "flux-router-component";
import IntlActionCreators from "../actions/IntlActionCreators";

// Actions to be executed before to render a request server-side,
function renderAction(context, { locale, url }, done) {

  actionUtils.executeMultiple(context, {
    loadIntlMessages: {
      action: IntlActionCreators.loadIntlMessages,
      isCritical: true,
      params: { locale }
    },
    navigate: {
      action: navigateAction,
      isCritical: true,
      params: { url }
    }
  }, (actionErrors) => {
    let err = null;

    if (actionErrors) {
      err = actionErrors.navigate || actionErrors.loadIntlMessages;
    }

    done(err);
  });

}

export default renderAction;
