import React, { useState } from "react";
import "./App.css";
import SideMenu from "./SideMenu";

function App() {
  const [filters, setFilters] = useState({
    department: "",
    fromDate: "",
    toDate: "",
    room: "",
    date: "",
  });

  const changeRoom = (e: any) => {
    setFilters({
      ...filters,
      room: e.target.value,
    });
  };

  const changeDate = (e: any) => {
    setFilters({
      ...filters,
      date: e.target.value,
    });
  };

  const changeDepartment = (e: any) => {
    setFilters({
      ...filters,
      department: e.target.value,
    });
  };

  const changeToDate = (e: any) => {
    setFilters({
      ...filters,
      toDate: e.target.value,
    });
  };

  const changeFromDate = (e: any) => {
    setFilters({
      ...filters,
      fromDate: e.target.value,
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <SideMenu
        changeRoom={changeRoom}
        changeDate={changeDate}
        changeDepartment={changeDepartment}
        changeToDate={changeToDate}
        changeFromDate={changeFromDate}
        filters={filters}
      />
      <h1>hello world</h1>
    </div>
  );
}

export default App;
