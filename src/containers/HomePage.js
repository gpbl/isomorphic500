import React, { Component } from "react";
import { connectToStores } from "fluxible-addons-react";

import ThumbnailCollection from "../components/ThumbnailCollection";

@connectToStores(["FeaturedStore"], context => {
  const ids = context.getStore("FeaturedStore").getFeaturedPhotos("popular");
  const photos = context.getStore("PhotoStore").getMultiple(ids);
  return { photos };
})
export default class HomePage extends Component {

  render() {
    const { photos } = this.props;
    return (
      <div>
        <ThumbnailCollection photos={ photos } />
      </div>
    );
  }

}
