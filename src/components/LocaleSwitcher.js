import React, { Component, PropTypes } from "react";
import { locales } from "../config";
import { writeCookie } from "../utils/CookieUtils";

if (process.env.BROWSER) {
  require("../style/LocaleSwitcher.scss");
}

class LocaleSwitcher extends Component {

  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="LocaleSwitcher">
        { locales.map(this.renderLocaleLink, this) }
      </div>
    );
  }

  renderLocaleLink(locale) {
    const currentLocale = this.context.getStore("IntlStore").getCurrentLocale();

    let className = "LocaleSwitcher-link";
    if (locale === currentLocale) {
      className = `${className} ${className}--active`;
    }

    return (
      <a key={locale}
         className={className}
         onClick={this.handleLocaleClick.bind(this, locale)}
         href={`?hl=${locale}`}>
          { locale }
      </a>
    );
  }

  handleLocaleClick(locale, e) {
    e.preventDefault();
    writeCookie("hl", locale, 365);
    window.location.reload();
  }

}

export default LocaleSwitcher;
