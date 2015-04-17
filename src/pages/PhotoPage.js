import React, { PropTypes, Component } from "react";
import DocumentTitle from "react-document-title";

import { connectToStores } from "fluxible/addons";

import Photo from "../components/Photo";
import PhotoMeta from "../components/PhotoMeta";

class PhotoPage extends Component {

  static propTypes = {
    photo: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  }

  render() {
    const { photo } = this.props;

    return (
      <DocumentTitle title={photo.name}>
        <div>
          <h1>{ photo.name }</h1>
          <PhotoMeta photo={ photo } />
          <Photo imageSize={4} photo={photo} />
        </div>
      </DocumentTitle>
    );
  }

}

PhotoPage = connectToStores(PhotoPage, ["PhotoStore"], (stores, props) =>
  ({ photo: stores.PhotoStore.get(props.id) })
);

export default PhotoPage;
