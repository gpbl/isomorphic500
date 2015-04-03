import React, { PropTypes } from 'react';

class PhotoAttribution extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props;
    return (
      <p>
        A photo by <a href={`https://500px.com/${user.username}`}>{ user.fullname }</a>.
      </p>
    );
  }

}

export default PhotoAttribution;
