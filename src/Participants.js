/* @flow */

import React, { Component } from "react";
import type { Output } from "./runContract";
import Select from "react-select";
import "react-select/dist/react-select.css";

type Selection = {
  name: string,
  address: string
};

const SELECTIONS: Array<Selection> = [
  {
    name: "Andrew Tian",
    address: "1btcalskjdlksajdlsa"
  },
  {
    name: "Tejas Tian",
    address: "2btcalskjdlksajdlsa"
  },
  {
    name: "Tian the Man",
    address: "3btcalskjdlksajdlsa"
  },
  {
    name: "Segment inc",
    address: "4btcalskjdlksajdlsa"
  }
];

type Props = {
  outputs: Array<Output>
};

const ParticipantOption = ({ option }: { option: Selection }) => {
  return (
    <div className="participantOption">
      <p>{option.name}</p>
      <p>{option.address}</p>
    </div>
  );
};

const ParticipantValue = ({ value }: { value: Selection }) => {
  return (
    <div>
      <p>{value.name}</p>
      <p>{value.address}</p>
    </div>
  );
};

const ParticipantSelector = ({ participant }: { participant: Output }) => {
  console.log(participant);
  return (
    <Select
      onChange={e => console.log(e)}
      optionComponent={ParticipantOption}
      options={SELECTIONS}
      placeholder={SELECTIONS[0]}
      value={participant}
      valueComponent={ParticipantValue}
    />
  );
};

class Participants extends Component<Props> {
  render() {
    const { outputs } = this.props;
    return (
      <div className="participants">
        <div className="sources">
          <h2>Sources</h2>
          <ParticipantSelector participant={outputs[0]} />
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
