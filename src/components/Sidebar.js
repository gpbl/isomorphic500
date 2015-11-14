import React, { Component } from "react";
import SidebarToggler from "../components/SidebarToggler";

if (process.env.BROWSER) {
  require("../style/Sidebar.scss");
}

export default class Sidebar extends Component {

  static defaultProps = {
    visible: true
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    }
  }

  toggle() {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    const { children } = this.props;
    const { visible } = this.state;
    const className = `Sidebar${visible ? " Sidebar--visible" : ""}`;
    return (
      <div key="sidebar" className={className}>

        <SidebarToggler
          showCloseButton={ visible }
          onClick={ ::this.toggle }
          className="Sidebar-toggler"
        />
        <div className="Sidebar-wrapper">
          { children }
        </div>
      </div>
    );

  }

}
