import React from 'react';
import { NavLink } from 'flux-router-component';

if (process.env.BROWSER) {
  require('../style/Footer.scss');
}

class Footer extends React.Component {

  render() {
    return (
      <div className="Footer">
        <div className="Footer-disclaimer">
          Photos copyright of their respective authors.
        </div>
        <div>
          <strong>isomorphic-500</strong>. <a href="https://github.com/gpbl/isomorphic-500">See this project’s page</a> or try something
          exciting: <NavLink className="Footer-link" routeName="bad">a bad route</NavLink> or <NavLink className="Footer-link" routeName="photo" navParams={{id: 100000000000}}>an unexisting photo</NavLink>
        </div>
      </div>
    );
  }

}

export default Footer;
