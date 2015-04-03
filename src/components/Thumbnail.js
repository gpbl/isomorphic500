import React, { PropTypes } from "react";

import { NavLink } from 'flux-router-component';

if (process.env.BROWSER) {
  require("../style/Thumbnail.scss");
}

class Thumbnail extends React.Component {

  static propTypes = {
    photo: PropTypes.object.isRequired
  }

  render() {
    const { photo } = this.props;
    const style = {
      backgroundImage: `url("${photo.images[0].url}")`
    };

    return (
      <NavLink routeName="photo" navParams={{id: photo.id}}>
        <div className="Thumbnail" style={style} />
      </NavLink>
    );
  }

}

export default Thumbnail;
