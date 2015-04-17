import React, { PropTypes } from "react";
import DocumentTitle from "react-document-title";
import { connectToStores } from "fluxible/addons";
import { NavLink, navigateAction } from "flux-router-component";

import Thumbnail from "../components/Thumbnail";

if (process.env.BROWSER) {
  require("../style/ThumbnailCollection.scss");
}

class FeaturedPage extends React.Component {

  static propTypes = {
    photos: PropTypes.array.isRequired
  }

  render() {
    const { photos, currentFeature } = this.props;
    return (
      <DocumentTitle title={`${currentFeature} on 500px`}>
        <div>

          <div className="ThumbnailCollection">
            {
              photos.map(photo => <Thumbnail key={photo.id} size="small" photo={photo} />)
            }
          </div>

        </div>
      </DocumentTitle>
    );
  }

}

FeaturedPage = connectToStores(FeaturedPage, ["PhotoStore"], (stores) =>
  ({
    photos: stores.PhotoStore.getFeatured(),
    currentFeature: stores.PhotoStore.getCurrentFeature()
  })
);

export default FeaturedPage;
