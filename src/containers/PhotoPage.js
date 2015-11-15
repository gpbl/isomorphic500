import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { navigateAction } from "fluxible-router";

import PhotoCaption from "../components/PhotoCaption";

if (process.env.BROWSER) {
  require("../style/PhotoPage.scss");
}

const keys = {
  LEFT: 37,
  RIGHT: 39
}

@connectToStores(["PhotoStore"], (context, props) => {

  const FeaturedStore = context.getStore("FeaturedStore");
  const feature = FeaturedStore.getCurrentFeature();
  const photo = context.getStore("PhotoStore").get(props.id);
  let nextId, prevId;

  if (feature && photo) {
    const photos = FeaturedStore.getFeaturedPhotos(feature);
    const index = photos.indexOf(photo.id);

    if (index === 0) {
      nextId = photos[index + 1];
      prevId = photos[photos.length - 1];
    } else if (0 < index && index < photos.length - 1) {
      nextId = photos[index + 1];
      prevId = photos[index - 1];
    } else {
      nextId = photos[0];
      prevId = photos[index - 1];
    }

  }
  return { photo, nextId, prevId, feature };
})

export default class PhotoPage extends Component {

  static propTypes = {
    photo: PropTypes.object,
    id: PropTypes.string.isRequired,
    nextId: PropTypes.number,
    prevId: PropTypes.number,
    feature: PropTypes.string
  }

  static contextTypes = {
    executeAction: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleKeyDown = ::this.handleKeyDown;
  }

  componentDidMount() {
    if (this.props.feature) {
      document.addEventListener("keydown", this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
    case keys.LEFT:
      this.showPrevPhoto();
      break;
    case keys.RIGHT:
      this.showNextPhoto();
      break;
    default:
      break;
    }
  }

  showNextPhoto() {
    this.context.executeAction(navigateAction, {
      url: `/photo/${this.props.nextId}`
    });
  }

  showPrevPhoto() {
    this.context.executeAction(navigateAction, {
      url: `/photo/${this.props.prevId}`
    });
  }

  render() {
    const { photo } = this.props;

    if (!photo) {
      return null;
    }

    return (
      <div>
        <div
          className="PhotoPage-background"
          style={{ backgroundImage: photo ? `url("${photo.images[0].url}")` : null }}
        />

        <div className="PhotoPage-photoContainer">
          <div
            className="PhotoPage-photo"
            style={{ backgroundImage: photo ? `url("${photo.images[1].url}")` : null }}
          />
          <div className="PhotoPage-caption">
            { photo && <PhotoCaption photo={ photo } /> }
          </div>
        </div>
      </div>
    );
  }

}
