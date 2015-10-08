import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";

import Photo from "../components/Photo";
import PhotoMeta from "../components/PhotoMeta";

@connectToStores(["PhotoStore"], (context, props) =>
  ({ photo: context.getStore("PhotoStore").get(props.id) })
)
export default class PhotoPage extends Component {

  static propTypes = {
    photo: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  }

  render() {
    const { photo } = this.props;

    return (
      <div>
        <h1>{ photo.name }</h1>
        <PhotoMeta photo={ photo } />
        <Photo imageSize={ 4 } photo={ photo } />
      </div>
    );
  }

}
