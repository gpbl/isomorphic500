import React,  { PropTypes } from "react";
import DocumentTitle from 'react-document-title';

import connectToStores from "../utils/connectToStores";
import PhotoAttribution from '../components/PhotoAttribution';
import Photo from '../components/Photo';

class PhotoPage extends React.Component {

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
          <PhotoAttribution user={ photo.user } />
          <Photo imageSize={4} photo={photo} />
        </div>
      </DocumentTitle>
    );
  }

}

PhotoPage = connectToStores(PhotoPage, ["PhotoStore"], (photoStore, props) => {
  return {
    photo: photoStore.get(props.id)
  }
})

export default PhotoPage;
