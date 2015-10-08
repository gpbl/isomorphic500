import React, { PropTypes } from "react";
import { connectToStores } from "fluxible-addons-react";

import Thumbnail from "../components/Thumbnail";

if (process.env.BROWSER) {
  require("../style/ThumbnailCollection.scss");
}

@connectToStores(["FeaturedStore"], context => {
  const ids = context.getStore("FeaturedStore").getFeaturedPhotos();
  const photos = context.getStore("PhotoStore").getMultiple(ids);
  return {
    photos: photos
  };
})
export default class FeaturedPage extends React.Component {

  static propTypes = {
    photos: PropTypes.array.isRequired
  }

  render() {
    const { photos } = this.props;
    return (
      <div>
        <div className="ThumbnailCollection">
          {
            photos.map(photo =>
              <Thumbnail key={ photo.id } size="small" photo={ photo } />
            )
          }
        </div>
      </div>
    );
  }

}
