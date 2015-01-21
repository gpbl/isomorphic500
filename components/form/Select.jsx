import React from 'react';
import {BROWSER} from '../../utils/env';
const Select = React.createClass({

  render() {

    if (BROWSER) require('../../style/components/form/select.scss');

    return (
      <span className="select">
        <select {...this.props} className="select__field" />
      </span>
    );
  }

});

export default Select;