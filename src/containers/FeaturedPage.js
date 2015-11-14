import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";

import ThumbnailCollection from "../components/ThumbnailCollection";

@connectToStores(["FeaturedStore"], (context, props) => {
  const ids = context.getStore("FeaturedStore").getFeaturedPhotos(props.feature);
  const photos = context.getStore("PhotoStore").getMultiple(ids);
  return { photos };
})

export default class FeaturedPage extends Component {

  static propTypes = {
    photos: PropTypes.array.isRequired
  }

  render() {
    const { photos } = this.props;
    return <ThumbnailCollection  photos={ photos } />
  }

}
