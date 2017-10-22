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
  outputs: Array<Output>,
  addOutput: Output => void
};

const ParticipantOption = ({
  option,
  onSelect
}: {
  option: Selection,
  onSelect: any => void
}) => {
  return (
    <div className="participantOption" onClick={() => onSelect(option)}>
      <p>
        {option.name} <span>{option.address}</span>
      </p>
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

const ParticipantSelector = ({
  participant,
  onSelect
}: {
  participant: Output,
  onSelect: any => void
}) => {
  console.log(participant);
  return (
    <Select
      onChange={onSelect}
      optionComponent={ParticipantOption}
      options={SELECTIONS}
      placeholder={SELECTIONS[0]}
      value={participant}
      valueComponent={ParticipantValue}
    />
  );
};

const ParticipantList = ({
  outputs,
  addParticipant
}: {
  outputs: Array<Output>,
  addParticipant: any => void
}) => {
  return (
    <div>
      {outputs.slice(0, outputs.length - 1).map(output => {
        return <ParticipantValue value={output} />;
      })}
      <ParticipantSelector
        participant={outputs[outputs.length - 1]}
        onSelect={option => {
          addParticipant(option);
        }}
      />
    </div>
  );
};

class Participants extends Component<Props> {
  render() {
    const { outputs } = this.props;
    return (
      <div className="participants">
        <div className="sources">
          <h2>Sources</h2>
          <ParticipantList
            outputs={outputs.filter(o => o.outputType === "source")}
            addParticipant={sel => {
              this.props.addOutput({
                name: sel.name,
                address: sel.address,
                outputType: "source",
                value: 0
              });
            }}
          />
        </div>
        <div className="arrow" />
        <div className="recipients">
          <h2>Recipients</h2>
          <ParticipantList
            outputs={outputs.filter(o => o.outputType === "recipient")}
            addParticipant={sel => {
              this.props.addOutput({
                name: sel.name,
                address: sel.address,
                outputType: "recipient",
                value: 0
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default Participants;
