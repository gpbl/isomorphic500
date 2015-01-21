import React from 'react';
import {IntlMixin, FormattedMessage, FormattedTime} from 'react-intl';
const Caption = React.createClass({

  mixins: [IntlMixin],

  propTypes: {
    photo: React.PropTypes.object.isRequired
  },

  render() {
    const { photo } = this.props;
    return (
      <div className="caption">
        <FormattedMessage 
          message={this.getIntlMessage('caption.title')} 
          name={photo.name} 
          username={photo.user.username} />
        on <FormattedTime value={photo.created_at} />
      </div>
    );
  }

});

export default Caption;