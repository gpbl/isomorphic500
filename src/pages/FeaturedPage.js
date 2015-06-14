import React, { PropTypes } from "react";
import { connectToStores } from "fluxible/addons";

import Thumbnail from "../components/Thumbnail";

if (process.env.BROWSER) {
  require("../style/ThumbnailCollection.scss");
}

class FeaturedPage extends React.Component {

  static propTypes = {
    photoIds: PropTypes.array.isRequired
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { photoIds } = this.props;
    const photos = this.context.getStore("PhotoStore").getMultiple(photoIds);
    return (
      <div>

        <div className="ThumbnailCollection">
          {
            photos.map(photo => <Thumbnail key={photo.id} size="small" photo={photo} />)
          }
        </div>

      </div>
    );
  }

}

FeaturedPage = connectToStores(FeaturedPage, ["FeaturedStore"], (stores) => {
  return {
    photoIds: stores.FeaturedStore.getFeaturedPhotos()
  };
});

export default FeaturedPage;
