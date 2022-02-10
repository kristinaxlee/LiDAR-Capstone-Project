import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import "./App.css";
import SideMenu from "./components/SideMenu";
import ZoomMenu from "./components/ZoomMenu";
import InfoModal from "./components/InfoModal";
import { init } from "./threeFunctions";
import TipToasts from "./components/Toasts";

const Map = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

const MapTitle = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
`;

function App() {
  const [titles, setTitles] = useState({
    curRoom: "",
    curDate: "",
    displayClicked: false
  });
  const [filters, setFilters] = useState({
    department: "",
    fromDate: "",
    toDate: "",
    room: "",
    date: "",
  });
  const setCurRoom = (e: any) => {
    setTitles({
      ...titles,
      curRoom: e.target.value,
    });


  }
  const setCurDate = (e: any) => {
    setTitles({
      ...titles,
      curDate: e.target.value,
    });


  }

  const setDisplayClicked = (e: any) => {
    setTitles({
      ...titles,
      displayClicked: e.target.value,
    });


  }
  const setRoom = (e: any) => {
    setFilters({
      ...filters,
      room: e.target.value,
    });
  };

  const setDate = (e: any) => {
    setFilters({
      ...filters,
      date: e.target.value,
    });
  };

  const setDepartment = (e: any) => {
    setFilters({
      ...filters,
      department: e.target.value,
    });
  };

  const setToDate = (e: any) => {
    setFilters({
      ...filters,
      toDate: e.target.value,
    });
  };

  const setFromDate = (e: any) => {
    setFilters({
      ...filters,
      fromDate: e.target.value,
    });
  };

  useLayoutEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <SideMenu
        setRoom={setRoom}
        setDate={setDate}
        setDepartment={setDepartment}
        setToDate={setToDate}
        setFromDate={setFromDate}
        filters={filters}
        setTitles = {setTitles}
      />

      <MapContainer id="container">
        <MapTitle>
        {titles.displayClicked && <div>
          <h1>{titles.curRoom}</h1>
          <h3>{titles.curDate}</h3>
          </div>}
            
        </MapTitle>
        <Map id="map-container">
          <div>Select a room to begin.</div>
        </Map>
        <ZoomMenu />
        <InfoModal />
        <TipToasts />
      </MapContainer>
    </div>
  );
}

export default App;
