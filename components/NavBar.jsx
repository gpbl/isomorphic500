import React from 'react';
import { NavLink } from 'flux-router-component';
import IntlMixin from 'react-intl';
import LocaleSwitcher from './misc/LocaleSwitcher.jsx';

const NavBar = React.createClass({
  
  mixins: [IntlMixin],

  propTypes: {
    context: React.PropTypes.object
  },

  render() {

    if (require('../utils/env').BROWSER) {
      require('../style/components/navbar.scss');
      require('../style/skin/logo.scss');
    }

    const { context } = this.props;
    return (
      <div className="navbar">
        <NavLink context={context} href="/" className="navbar__logo logo" /> 
        <div className="navbar__locale">
          <LocaleSwitcher context={context} />
        </div>
      </div>
    );
  }

});

export default NavBar;