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

  render() {
    return (
      <div className="App">
        <div className="container">
          {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <CodeEditor code={this.state.code} onChange={this.onCodeChange} />
          <Inputs inputs={[]} />
        </p> */}
          <Navbar selectedTab={this.state.selectedTab} setTab={this.setTab} />
          <div className="row">
            <InputSliders inputs={this.inputs} />
            <div className="simulation" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
