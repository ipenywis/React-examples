import React from "react";

import Transition from "react-transition-group/Transition";

export default class FadeTransition extends React.Component {

  constructor(props) {
    super(props);
    //Default Style
    this.defaultStyle = {
      transitionProperty: "opacity",
      transition: `${this.props.duration}ms ease-in-out`
    };
    this.transitionStyle = {
      entering: {
        opacity: "0"
      },
      entered: {
        opacity: "1",
        transitionDelay: "700ms"
      },
      exiting: {
        opacity: "0"
      },
      exited: {
        opacity: "0"
      }
    };
  }

  render() {

    return (
      <Transition in={this.props.isOpen} timeout={this.props.duration}>
        {(state) => {
          if (state == "exited") 
            return null;
          return React
            .Children
            .map(this.props.children, (child, idx) => {
              return React.cloneElement(child, {
                style: Object.assign({}, this.defaultStyle, this.transitionStyle[state])
              });
            });
        }}
      </Transition>
    );

  }

}
