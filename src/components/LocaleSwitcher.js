import React, { Component, PropTypes } from "react";
import { connectToStores } from "fluxible-addons-react";

import { locales } from "../config";
import { writeCookie } from "../utils/CookieUtils";

if (process.env.BROWSER) {
  require("../style/LocaleSwitcher.scss");
}

@connectToStores([], context =>
  ({ currentLocale: context.getStore("IntlStore").getCurrentLocale() })
)
export default class LocaleSwitcher extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired
  }

  handleLocaleClick(locale, e) {
    e.preventDefault();
    writeCookie("hl", locale, 365);
    window.location.reload();
  }

  renderLocaleLink(locale) {
    const { currentLocale } = this.props;

    let className = "LocaleSwitcher-link";
    if (locale === currentLocale) {
      className = `${className} ${className}--active`;
    }

    return (
      <a key={ locale }
         className={ className }
         onClick={ this.handleLocaleClick.bind(this, locale) }
         href={ `?hl=${locale}` }>
          { locale }
      </a>
    );
  }

  render() {
    return (
      <div className="LocaleSwitcher">
        { locales.map(this.renderLocaleLink, this) }
      </div>
    );
  }

}
