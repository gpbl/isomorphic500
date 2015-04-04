import React,  { PropTypes } from "react";
import DocumentTitle from 'react-document-title';

import { connectToStores } from "fluxible/addons";
import PhotoAttribution from '../components/PhotoAttribution';
import Photo from '../components/Photo';

if (process.env.BROWSER) {
  require('../style/Animate.scss')
}

class PhotoPage extends React.Component {

  static propTypes = {
    photo: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  }

  render() {
    const { photo } = this.props;
    return (
      <DocumentTitle title={photo.name}>
        <div className="Animate-fadeIn">
          <h1>{ photo.name }</h1>
          <PhotoAttribution user={ photo.user } />
          <Photo imageSize={4} photo={photo} />
        </div>
      </DocumentTitle>
    );
  }

}

PhotoPage = connectToStores(PhotoPage, ["PhotoStore"], {
  PhotoStore: (store, props) => ({ photo: store.get(props.id) })
})

export default PhotoPage;
