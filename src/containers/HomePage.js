import React, { Component } from "react";
import { FormattedMessage }  from "../utils/IntlComponents";

export default class HomePage extends Component {

  render() {
    return (
      <div>
        <FormattedMessage message="home.welcome" />
      </div>
    );
  }

}
