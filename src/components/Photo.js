import React, { PropTypes, Component } from "react";
import { loadPhoto } from "../actions/PhotoActionCreators";

export default class Photo extends Component {

  static propTypes = {
    photo: PropTypes.object.isRequired,
    imageSize: PropTypes.number
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  static defaultProps = {
    imageSize: 1600
  }

  componentDidMount() {
    const { photo, imageSize } = this.props;
    if (photo.images[0].size < imageSize) {
      this.context.executeAction(loadPhoto, { id: photo.id, imageSize: imageSize });
    }
  }

  render() {
    const { photo } = this.props;
    return (
      <a href={ `https://500px.com/photo/${photo.id}` }>
        <img style={ {width: "100%", height: "auto"} } src={ photo.images[0].url } />
      </a>
    );
  }

}
