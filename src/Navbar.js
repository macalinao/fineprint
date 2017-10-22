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
        onClick={() => setTab("edit")}
        className={selectedTab === "edit" ? "selected" : ""}
      >
        Edit Contract
      </a>
      <a
        onClick={() => setTab("simulation")}
        className={selectedTab === "simulation" ? "selected" : ""}
      >
        Evaluate
      </a>
      <a
        onClick={() => setTab("diff")}
        className={selectedTab === "diff" ? "selected" : ""}
      >
        Review and Submit
      </a>
    </div>
  );
};

export default Navbar;
