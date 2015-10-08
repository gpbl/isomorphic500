import React, { PropTypes } from "react";

import { NavLink } from "fluxible-router";

if (process.env.BROWSER) {
  require("../style/Thumbnail.scss");
}

export default class Thumbnail extends React.Component {

  static propTypes = {
    photo: PropTypes.object.isRequired
  }

  render() {
    const { photo } = this.props;
    const style = {
      backgroundImage: `url("${photo.images[0].url}")`
    };

    return (
      <NavLink className="Thumbnail" style={ style } routeName="photo" navParams={ {id: photo.id} } />
    );
  }

}
