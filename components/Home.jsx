import React from 'react';
import IntlMixin from 'react-intl';

import { StoreMixin } from 'fluxible-app';
import PhotosStore from '../stores/PhotosStore';
import config from '../config/app';
import getIntl from '../actions/getI18n';

const Home = React.createClass({
  mixins: [StoreMixin, IntlMixin],
  
  statics: {
    storeListeners: [PhotosStore]
  },

  getInitialState() {
    return this.getStore(PhotosStore).getState();
  },

  onChange() {
    const state = this.getStore(PhotosStore).getState();
    this.setState(state);
  },

  handleLocaleChange(e) {
    this.props.context.executeAction(getIntl, {locale: e.target.value});
  },

  render() {
    return (
      <div>
        <p>{ this.getIntlMessage('home.welcome') }</p>;
        <select onChange={this.handleLocaleChange}>
          {
            config.locales.map((locale) => {
              return <option key={locale} value={locale}>{locale}</option>
            })
          }

        </select>
        { 
          this.state.photos.map((photo, i) => {
            return <p key={i}>{ photo.title }</p>;
          })
        }
      </div>
    );
  }
});

export default Home;