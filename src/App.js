/* @flow */

import type { Input, Output } from "./runContract";
import React, { Component } from "react";
import logo from "./logo.svg";
import { CodeEditor, CodeEditor2 } from "./CodeEditor";
import Inputs from "./Inputs";
import InputSliders from "./InputSliders";
import "./App.css";
import runContract from "./runContract";
import Navbar from "./Navbar";
import Participants from "./Participants";
import Highcharts from "highcharts";
import ReactHighcharts from "react-highcharts";
import * as JsDiff from "diff";

type Props = {};

type State = {
  oldCode: string,
  code: string,
  inputs: Array<Input>,
  sourceOutputs: Array<Output>,
  recipientOutputs: Array<Output>,
  selectedTab: string,
  selectedEditorTab: string,
  switched: boolean
};

const DEFAULT_CONTRACT = `
  var total = input.price * input.quantity;
  var output = {
    'Andrew Tian': 0,
    'R.C. Cola': 0,
    'Segment Inc': 0
  }

  if (input.quantity > 100) {
    output['Andrew Tian'] = total * 0.10;
    output['Segment Inc'] = total * 0.90;
  }
  else if (input.quantity > 50) {
    output['Andrew Tian'] = total * 0.05;
    output['Segment Inc'] = total * 0.95;
  }
  else if (input.quantity > 10) {
    output['Andrew Tian'] = total * 0.02;
    output['Segment Inc'] = total * 0.98;
  }

  output['R.C. Cola'] = total;

  return output;
`;

const DEFAULT_INPUTS = [
  {
    name: "price",
    inputType: "dollars",
    value: 50.5,
    max: 101
  },
  {
    name: "quantity",
    inputType: "number",
    value: 100,
    max: 200
  }
];

const DEFAULT_RECIPIENT_OUTPUTS = [
  {
    name: "Andrew Tian",
    address: "1btcalskjdlksajdlsa",
    outputType: "recipient"
  },
  {
    name: "Segment Inc",
    address: "4btcalskjdlksajdlsa",
    outputType: "recipient"
  }
];

const DEFAULT_SOURCE_OUTPUTS = [
  {
    name: "R.C. Cola",
    address: "3btcalskjdlksajdlsa",
    outputType: "source"
  }
];

const fmtMoney = (money: number) => {
  return "$" + (money || 0).toFixed(2);
};

class ParticipantPie extends Component<{ data: Array<*> }> {
  render() {
    const { data } = this.props;
    return (
      <ReactHighcharts
        config={{
          title: {
            text: ""
          },
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie"
          },
          tooltip: {
            pointFormat: "<b>{point.percentage:.1f}%</b> (${point.y:.2f})"
          },
          legend: {
            itemStyle: null
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              size: "75%",
              dataLabels: {
                enabled: true,
                // distance: -15,
                format: "<b>{point.name}</b>:<br>{point.percentage:.1f} %",
                style: {
                  color:
                    (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                    "black"
                }
              }
            }
          },
          series: [
            {
              name: "Share",
              colorByPoint: true,
              data: data
            }
          ]
        }}
        ref={"chart"}
        style={{ width: "00%", height: "200px", position: "relative" }}
      />
    );
  }
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      oldCode: DEFAULT_CONTRACT,
      code: DEFAULT_CONTRACT,
      inputs: DEFAULT_INPUTS,
      recipientOutputs: DEFAULT_RECIPIENT_OUTPUTS,
      sourceOutputs: DEFAULT_SOURCE_OUTPUTS,
      selectedTab: "selector",
      selectedEditorTab: "variables",
      switched: false
    };
  }

  makeTransaction = () => {
    let dat = {
      body: JSON.stringify({
        to: "tejas",
        amount: 4000,
        from: "ian"
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8"
      }
    };
    alert("Contract request sent.");

    // let bDat = new Blob([JSON.stringify(dat)], {type: "application/json"});

    //console.log(JSON.stringify(dat));

    fetch("http://62c437b5.ngrok.io/transactions", dat)
      .then(response => {
        console.log("1");
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Network response not ok");
      })
      .then(myBlob => {
        console.log(URL.createObjectURL(myBlob));
      });
  };

  fetchContractResults = () => {
    return runContract([], this.state.code);
  };

  onCodeChange = (code: string) => {
    this.setState({
      code: code
    });
  };

  addInput = (input: Input) => {
    const inputIndex = this.state.inputs.findIndex(i => i.name === input.name);
    if (inputIndex == -1) {
      this.state.inputs[this.state.inputs.length] = {
        name: input.name,
        inputType: "number",
        value: 0.0,
        max: 0.0
      };
    } else {
      alert("There is a duplicate variable. Cannot add. ");
    }
    this.forceUpdate();
  };

  onRemove = (name: string) => {
    this.setState({
      inputs: this.state.inputs.filter((i: Input) => {
        return i.name != name;
      })
    });
  };

  setTab = (tab: string) => {
    this.setState({
      selectedTab: tab
    });
  };

  _renderVariables() {
    return (
      <Inputs
        inputs={this.state.inputs}
        onRemove={this.onRemove}
        addInput={this.addInput}
        onNameChange={this.onNameChange}
        onTypeChange={this.onTypeChange}
      />
    );
  }

  _renderParticipants() {
    return <p>participants</p>;
  }

  _setEditorTab = (tab: string) => {
    this.setState({
      selectedEditorTab: tab
    });
  };

  _renderEditorTabSelector() {
    const { selectedEditorTab } = this.state;
    console.log(selectedEditorTab);

    return (
      <div className="selector">
        <a
          onClick={() => this._setEditorTab("variables")}
          className={
            "variables " + (selectedEditorTab === "variables" ? "selected" : "")
          }
        >
          Variables
        </a>
        <a
          onClick={() => this._setEditorTab("participants")}
          className={
            "participants " +
            (selectedEditorTab === "participants" ? "selected" : "")
          }
        >
          Participants
        </a>
      </div>
    );
  }

  // doesnt add but actually changes
  _addOutput = (outputType: string, o: ?Output) => {
    const outputTypeKey =
      outputType === "recipient" ? "recipientOutputs" : "sourceOutputs";
    const outputs = this.state[outputTypeKey];

    if (!o && outputs.length > 0) {
      this.setState({
        [outputTypeKey]: this.state[outputTypeKey].slice(
          0,
          this.state[outputTypeKey].length - 1
        )
      });
      return;
    }
    this.setState({
      [outputTypeKey]: [
        ...this.state[outputTypeKey].slice(
          0,
          this.state[outputTypeKey].length - 1
        ),
        o
      ]
    });
  };

  _appendOutput = (o: Output) => {
    this.setState({
      [o.outputType + "Outputs"]: [...this.state[o.outputType + "Outputs"], o]
    });
  };

  _renderEditor() {
    let tab = null;

    let codeSwitch = () => {
      return !this.state.switched ? (
        <CodeEditor2 code={this.state.code} onChange={this.onCodeChange} />
      ) : (
        <CodeEditor code={this.state.code} onChange={this.onCodeChange} />
      );
    };

    let _switchCodeview = () => {
      this.setState({ switched: !this.state.switched });
    };

    if (this.state.selectedEditorTab === "variables") {
      tab = this._renderVariables();
    } else {
      tab = (
        <Participants
          sourceOutputs={this.state.sourceOutputs}
          recipientOutputs={this.state.recipientOutputs}
          addOutput={this._addOutput}
          appendOutput={this._appendOutput}
        />
      );
    }
    return (
      <div className="row">
        <div className="editorTab">
          {this._renderEditorTabSelector()}
          {tab}
        </div>
        <div className="cswitch">
          <a onClick={_switchCodeview}>Switch</a>
        {codeSwitch()}
        </div>
      </div>
    );
  }

  _renderSimulation() {
    const date = new Date();
    const fmt =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

    let contractz = null;
    try {
      contractz = runContract(this.state.inputs, this.state.code);
    } catch (e) {
      contractz = runContract(this.state.inputs, this.state.oldCode);
      alert("There was an error in your contract. Reverting.");
      this.setState({
        code: this.state.oldCode
      });
    }

    const recipientPie = this.state.recipientOutputs.map(r => {
      return {
        name: r.name,
        y: contractz[r.name]
      };
    });

    const sourcePie = this.state.sourceOutputs.map(r => {
      return {
        name: r.name,
        y: contractz[r.name]
      };
    });

    return (
      <div className="row">
        <InputSliders
          inputs={this.state.inputs}
          onNewValue={this.onNewInputValue}
          onSliderChange={this.onSliderChange}
        />
        <div className="simulation">
          <div className="heads">
            <div className="first">
              <h2>Summary</h2>
              <p className="bigDate">{fmt}</p>
            </div>
            <div className="last">
              <button onClick={this.makeTransaction}>Send Funds</button>
            </div>
          </div>

          <div className="simParticipants">
            <div className="payees">
              <h3>Payees</h3>
              <ul>
                {this.state.recipientOutputs.map(r => {
                  return (
                    <li>
                      {r.name} -{" "}
                      <span className="money">
                        {fmtMoney(contractz[r.name])}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <ParticipantPie data={recipientPie} />
            </div>
            <div className="payors">
              <h3>Payors</h3>
              <ul>
                {this.state.sourceOutputs.map(r => {
                  return (
                    <li>
                      {r.name} -{" "}
                      <span className="money">
                        ({fmtMoney(-contractz[r.name])})
                      </span>
                    </li>
                  );
                })}
              </ul>
              <ParticipantPie data={sourcePie} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSliderChange = (name: string, value: number) => {
    const input = this.state.inputs.find(input => input.name === name);
    if (input && input.max) {
      input.value = value / 100 * input.max;
    }
    // weird force update
    this.setState({
      inputs: this.state.inputs
    });
  };

  onNewInputValue = (name: string, value: any) => {
    const input = this.state.inputs.find(input => input.name === name);
    if (input) {
      // TODO(igm): handle dates
      input.value = value;
      input.max = value * 2;
    }
    // weird force update
    this.setState({
      inputs: this.state.inputs
    });
  };

  onNameChange = (oldName: string, newName: string) => {
    const inputIndex = this.state.inputs.findIndex(
      input => input.name === oldName
    );
    this.state.inputs[inputIndex].name = newName;
    this.forceUpdate();
  };

  onTypeChange = (inName: string, newType: string) => {
    const inputIndex = this.state.inputs.findIndex(
      input => input.name === inName
    );
    this.state.inputs[inputIndex].inputType = newType;
    this.forceUpdate();
  };

  _renderSelector() {
    return (
      <div className="selectorPage">
        <h1>Select one</h1>
        <h2>template to get started</h2>
        <div className="templates">
          <div className="template" onClick={() => this.setTab("edit")}>
            <img src="/commissions.png" />
            <h3>Commissions</h3>
            <p>payment of services rendered or products sold</p>
          </div>
          <div className="template" onClick={() => this.setTab("edit")}>
            <img src="/fixedprice.png" />
            <h3>Fixed Price</h3>
            <p>the seller and buyer agree on a fixed price</p>
          </div>
          <div className="template" onClick={() => this.setTab("edit")}>
            <img src="/reimburse.png" />
            <h3>Reimburse</h3>
            <p>seller reimburses buyer based on certain metrics</p>
          </div>
          <div className="template" onClick={() => this.setTab("edit")}>
            <img src="/unitprice.png" />
            <h3>Unit Price</h3>
            <p>hourly rate contracts common for freelancers</p>
          </div>
        </div>
      </div>
    );
  }

  _renderDiff() {
    const diff = JsDiff.diffLines(this.state.oldCode, this.state.code);
    return (
      <div className="diffPage">
        <div className="s4r">
          <textarea placeholder="Write a description of the changes below..." />
          <button
            className="publish"
            onClick={() => alert("Submitted to the blockchain.")}
          >
            Submit for review
          </button>
        </div>
        <div className="sideBySide">
          <div className="oldCode">
            <h2>Old Code</h2>
            <div className="unformatted">{this.state.oldCode}</div>
          </div>
          <div className="newCode">
            <h2>Diff</h2>
            <div className="unformatted">
              {diff.map(part => {
                return (
                  <div
                    className={
                      "part " +
                      (part.added ? "added " : "") +
                      (part.removed ? "removed" : "")
                    }
                  >
                    {part.value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let view = null;
    if (this.state.selectedTab === "selector") {
      view = this._renderSelector();
    } else if (this.state.selectedTab === "simulation") {
      view = (
        <div>
          <Navbar selectedTab={this.state.selectedTab} setTab={this.setTab} />
          {this._renderSimulation()}
        </div>
      );
    } else if (this.state.selectedTab === "diff") {
      view = (
        <div>
          <Navbar selectedTab={this.state.selectedTab} setTab={this.setTab} />
          {this._renderDiff()}
        </div>
      );
    } else {
      view = (
        <div>
          <Navbar selectedTab={this.state.selectedTab} setTab={this.setTab} />
          {this._renderEditor()}
        </div>
      );
    }
    return (
      <div className="App">
        <div className="topnav">
          <div className="containert">
            <div className="topnavRow">
              <div className="leftPart">
                <img className="logo" src="/logo.png" />
              </div>
              <div className="rightPart">
                <img className="notif" src="/notification.png" />
                <img className="jiandong" src="/jiandong.png" />
              </div>
            </div>
          </div>
        </div>
        <div className="container">{view}</div>
        <div className="footer">Powered by MasterCard Blockchain</div>
      </div>
    );
  }
}

export default App;
