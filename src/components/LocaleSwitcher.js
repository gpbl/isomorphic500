import React, { Component, PropTypes } from "react";
import { connectToStores } from "fluxible/addons";
import { locales } from "../config";
import { writeCookie } from "../utils/CookieUtils";

if (process.env.BROWSER) {
  require("../style/LocaleSwitcher.scss")
}

class LocaleSwitcher extends Component {

  static propTypes = {
    currentLocale: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="LocaleSwitcher">
        { locales.map(this.renderLocaleLink, this) }
      </div>
    )
  }

  renderLocaleLink(locale) {
    const { currentLocale } = this.props;

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
    )
  }

  handleLocaleClick(locale, e) {
    e.preventDefault();
    writeCookie("hl", locale, 365);
    window.location.reload();
  }

}

LocaleSwitcher = connectToStores(LocaleSwitcher, ["IntlStore"], {
  IntlStore: (store) => ({ currentLocale: store.getCurrentLocale() })
});

export default LocaleSwitcher;
