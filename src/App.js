/* @flow */

import React, { Component } from "react";
import logo from "./logo.svg";
import CodeEditor from "./CodeEditor";
import Inputs from "./Inputs";
import InputSliders from "./InputSliders";
import "./App.css";
import runContract from "./runContract";
import Navbar from "./Navbar";

type Props = {};

type State = {
  code: string,
  selectedTab: string
};

const DEFAULT_CONTRACT = `
  function(price, quantity) {
    var total = price * quantity;
    return [
      {
        name: 'bob',
        value: total * 0.05
      },
      {
        name: 'segment',
        value: total * 0.95
      },
      {
        name: 'client',
        value: -total
      }
    ]
  }
`;

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      code: DEFAULT_CONTRACT,
      selectedTab: "simulation"
    };
  }

  inputs = [
    {
      name: "price",
      inputType: "dollars",
      value: 50.5
    },
    {
      name: "quantity",
      inputType: "number",
      value: 100
    }
  ];

  fetchContractResults = () => {
    return runContract([], this.state.code);
  };

  onCodeChange = (code: string) => {
    this.setState({
      code: code
    });
  };

  setTab = (tab: string) => {
    this.setState({
      selectedTab: tab
    });
  };

  _renderEditor() {
    return (
      <div className="row">
        <CodeEditor code={this.state.code} onChange={this.onCodeChange} />
        <Inputs inputs={[]} />
      </div>
    );
  }

  _renderSimulation() {
    return (
      <div className="row">
        <InputSliders inputs={this.inputs} />
        <div className="simulation" />
      </div>
    );
  }

  render() {
    let view = null;
    if (this.state.selectedTab === "simulation") {
      view = this._renderSimulation();
    } else {
      view = this._renderEditor();
    }
    return (
      <div className="App">
        <div className="container">
          <Navbar selectedTab={this.state.selectedTab} setTab={this.setTab} />
          {view}
        </div>
        <div className="footer">Powered by MasterCard Blockchain</div>
      </div>
    );
  }
}

export default App;
