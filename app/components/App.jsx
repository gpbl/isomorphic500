"use strict";

var React         = require('react');
var Router        = require('react-router');

var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

var data = require('../public/data/places');

var App = React.createClass({

  statics: {
    title: function(params) {
      return "Places in Italy";
    }
  },

  componentDidMount: function() {
    // confirm it works client-side
    console.info("Application has been mounted.");
  },


  getDefaultProps: function () {
    return { places: data };
  },

  render: function () {
    var links = this.props.places.map(function (place) {
      return (
        <li key={"place-" + place.id}>
          <Link to="place" params={{ id: place.id }}>{place.name}</Link>
        </li>
      );
    });
    return (
      <div className="app">
        <h1>Some places in Italy</h1>
        <ul className="master">
          { links }
        </ul>
        <div className="detail">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

module.exports = App;