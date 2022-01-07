import React, { useState } from "react";
import "./App.css";
import SideMenu from "./SideMenu";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <SideMenu />
      <h1>hello world</h1>
    </div>
  );
}

export default App;
