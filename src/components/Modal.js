import React, { Component, PropTypes } from "react";

import { TransitionMotion, spring } from "react-motion";

const modalStyle = {
  backgroundColor: "rgba(0, 0, 0, .9)",
  padding: "1rem",
  maxWidth: "600px"
}

const containerStyle = {
  display: "flex",
  position: "fixed",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
}

export default class RouteModal extends Component {

  static propTypes = {
    visible: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
  }

  getStyles() {
    if (this.state.visible) {
      return {
        modal: {
          ...modalStyle,
          opacity: spring(1),
          content: this.props.children
        }
      }
    }
    return {};
  }

  willEnter() {
    const { children } = this.props;
    return {
      opacity: spring(0),
      content: children
    };

  }

  willLeave(key, style) {
    return {
      ...style,
      opacity: spring(0)
    }
  }

  renderContent(styles) {
    return (
      Object.keys(styles).map(key => {
        const { content, ...style } = styles[key];

        return (
          <div key="modal" style={ containerStyle }>
            <div style={ style }>
              <div onClick={ (e) => { e.preventDefault; this.setState({visible: false })}}>
                Close
              </div>
              { content }
            </div>
          </div>
        );
      })
    );
  }

  render() {
    return (
      <TransitionMotion
        styles={ this.getStyles() }
        willEnter={ ::this.willEnter }
        willLeave={ ::this.willLeave }>

        { styles => <div>{ this.renderContent(styles) }</div> }

      </TransitionMotion>
    );
  }
}

