/* @flow */

import React, { Component } from "react";
import type { Output } from "./runContract";

type Props = {
  outputs: Array<Output>
};

class Participants extends Component<Props> {
  render() {
    const { outputs } = this.props;
    return (
      <div className="participants">
        <div className="sources">
          <h2>Sources</h2>
        </div>
        <div className="arrow" />
        <div className="recipients">
          <h2>Recipients</h2>
        </div>
      </div>
    );
  }
}

export default Participants;
