'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var places        = require('../public/data/places');
var NotFound      = require('./NotFound.jsx');

function findPlace(id) {
  for (var i = 0; i < places.length; i++) {
    if (places[i].id === id) return places[i];   
  }
}

var Place = React.createClass({
  mixins: [ Router.State ],

  render: function () {
    var place = findPlace(this.getParams().id);

    if (!place) return <NotFound />;

    return (
      <DocumentTitle title={ place.name }>
        <div className="place">
          <h2>{ place.name }</h2>
          <img src={ '/images/' + place.id + '.jpg' }/>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = Place;
