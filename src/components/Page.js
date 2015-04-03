import React from 'react';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

if (process.env.BROWSER) {
  require("../style/Page.scss");
}

class Page extends React.Component {

  render() {
    return (
      <div className="Page">
        <div className="Page-header">
          <NavBar />
        </div>

        <div className="Page-body">
          { this.props.children }
        </div>

        <div className="Page-footer">
          <Footer />
        </div>
      </div>
    );
  }

}

export default Page;
