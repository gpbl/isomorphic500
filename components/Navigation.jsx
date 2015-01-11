// Inspired by https://github.com/yahoo/flux-examples/master/routing/components/Nav.jsx
import React from 'react';
import { NavLink } from 'flux-router-component';

const Navigation = React.createClass({

  getInitialState: function () {
    return {
      links: {},
      selected: 'home'
    };
  },
  
  render: function() {
    const selected = this.props.selected || this.state.selected;
    const links = this.props.links || this.state.links;
    const { context } = this.props;
    
    const linkHTML = Object.keys(links).map((name) => {
      var className = '', link = links[name];
      if (selected === name) 
        className = 'pure-menu-selected';
      return (
        <li className={className} key={link.path}>
          <NavLink routeName={link.page} context={context}>
            {link.label}
          </NavLink>
        </li>
      );
    });
    
    return (
      <ul className="pure-menu pure-menu-open pure-menu-horizontal">
        { linkHTML }
      </ul>
    );
  }
});

export default Navigation;