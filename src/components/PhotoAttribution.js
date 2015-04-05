import React, { PropTypes } from 'react';
import FormattedMessage from '../components/FormattedMessage';

class PhotoAttribution extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props;
    return (
      <FormattedMessage
        message="photo.attribution"
        userLink={
          <a href={`https://500px.com/${user.username}`}>{ user.fullname }</a>
        }
      />
    );
  }

}

export default PhotoAttribution;
