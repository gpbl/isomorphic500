'use strict';

var React  = require('react');
var Router = require('react-router');
var places = require('../public/data/places');

function findPlace(id) {
  for (var i = 0; i < places.length; i++) {
    if (places[i].id === id) return places[i];   
  }
}

var Place = React.createClass({
  mixins: [ Router.State ],

  statics: {
    title: function(params) {
      var place = findPlace(params.id);
      return place.name;
    }
  },

  imageUrl: function (id) {
    return '/images/' + id + '.jpg';
  },

  render: function () {
    var place = findPlace(this.getParams().id);
    return (
      <div className="place">
        <h2>{ place.name }</h2>
        <img src={this.imageUrl(place.id)}/>
      </div>
    );
  }
});

module.exports = Place;
