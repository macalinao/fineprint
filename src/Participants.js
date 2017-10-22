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
    <div className="participantValue">
      <p>{value.name}</p>
      <p className="address">{value.address}</p>
    </div>
  );
};

const ParticipantSelector = ({
  participant,
  selections,
  onSelect
}: {
  participant: Output,
  selections: Array<Selection>,
  onSelect: any => void
}) => {
  return (
    <Select
      onChange={onSelect}
      optionComponent={ParticipantOption}
      options={selections}
      value={participant}
      valueComponent={ParticipantValue}
    />
  );
};

const ParticipantList = ({
  outputType,
  outputs,
  addParticipant,
  appendOutput
}: {
  outputType: "recipient" | "source",
  outputs: Array<Output>,
  addParticipant: (string, ?Output) => void,
  appendOutput: Output => void
}) => {
  const existing = outputs.map(o => o.address);
  const allowed = SELECTIONS.filter(s => !existing.includes(s.address));

  let list = null;
  if (outputs.length !== 0) {
    list = [
      ...outputs.slice(0, outputs.length - 1).map(output => {
        return <ParticipantValue value={output} />;
      }),
      <ParticipantSelector
        participant={outputs[outputs.length - 1]}
        selections={allowed}
        onSelect={option => {
          if (!option) {
            addParticipant(outputType, null);
            return;
          }
          addParticipant(outputType, {
            name: option.name,
            address: option.address,
            outputType: outputType,
            value: 0
          });
        }}
      />
    ];
  }
  return (
    <div>
      {list}
      <button
        onClick={() => {
          if (allowed.length === 0) {
            // none left
            return;
          }
          const pick = allowed[0];
          appendOutput({
            name: pick.name,
            address: pick.address,
            outputType: outputType,
            value: 0
          });
        }}
      >
        Add funding {outputType}
      </button>
    </div>
  );
};

type Props = {
  sourceOutputs: Array<Output>,
  recipientOutputs: Array<Output>,
  addOutput: (string, ?Output) => void,
  appendOutput: Output => void
};

class Participants extends Component<Props> {
  render() {
    const { sourceOutputs, recipientOutputs, appendOutput } = this.props;
    return (
      <div className="participants">
        <div className="sources">
          <h2>Sources</h2>
          <ParticipantList
            outputs={sourceOutputs}
            outputType="source"
            addParticipant={this.props.addOutput}
            appendOutput={appendOutput}
          />
        </div>
        <div className="arrow" />
        <div className="recipients">
          <h2>Recipients</h2>
          <ParticipantList
            outputs={recipientOutputs}
            outputType="recipient"
            addParticipant={this.props.addOutput}
            appendOutput={appendOutput}
          />
        </div>
      </div>
    );
  }
}

export default Participants;
