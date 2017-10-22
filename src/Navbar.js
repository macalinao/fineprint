/* @flow */

import React from "react";

type Props = {
  selectedTab: string,
  setTab: string => void
};

const Navbar = ({ selectedTab, setTab }: Props) => {
  return (
    <div className="navbar">
      <a
        onClick={() => setTab("simulation")}
        className={selectedTab === "simulation" ? "selected" : ""}
      >
        Simulation
      </a>
      <a
        onClick={() => setTab("edit")}
        className={selectedTab === "edit" ? "selected" : ""}
      >
        Edit Contract
      </a>
    </div>
  );
};

export default Navbar;
