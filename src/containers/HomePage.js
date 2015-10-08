import React, { Component } from "react";
import { FormattedMessage }  from "../utils/IntlComponents";

class HomePage extends Component {

  render() {
    return (
      <div>
        <FormattedMessage message="home.welcome" />
      </div>
    );
  }

}

export default HomePage;
