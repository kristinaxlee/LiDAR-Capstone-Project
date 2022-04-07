import React, { useState, useLayoutEffect } from "react";
import "./App.css";
import SideMenu from "./components/SideMenu";
import ZoomMenu from "./components/ZoomMenu";
import InfoModal from "./components/InfoModal";
import { init } from "./threeFunctions";
import { MapContainer, MapTitle, Map } from "./components/ui/AppUI";
import { TipToasts, WarningToast } from "./components/Toasts";

function App() {
  const [showWarning, setShowWarning] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [showTips, setShowTips] = useState(false);

  const [titles, setTitles] = useState({
    curRoom: "",
    curDate: "",
    displayClicked: false,
  });

  const [filters, setFilters] = useState({
    department: "",
    fromDate: "",
    toDate: "",
    room: "",
    building: "",
    date: "",
  });

  const [selectedScan, setSelectedScan] = useState({});

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

  const setBuilding = (e: any) => {
    setFilters({
      ...filters,
      building: e.target.value,
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
        setBuilding={setBuilding}
        setToDate={setToDate}
        setFromDate={setFromDate}
        filters={filters}
        setTitles={setTitles}
        setShowWarning={setShowWarning}
        firstLoad={firstLoad}
        setFirstLoad={setFirstLoad}
        setShowTips={setShowTips}
        setSelectedScan={setSelectedScan}
        selectedScan={selectedScan}
      />
      <MapContainer id="container">
        <MapTitle>
          {titles.displayClicked && (
            <div>
              <h1 style={{ fontWeight: 700 }}>{titles.curRoom}</h1>
              <h3 style={{ fontWeight: 600 }}>{titles.curDate}</h3>
            </div>
          )}
        </MapTitle>
        <Map id="map-container">
          <div>Select a room to begin.</div>
        </Map>
        <ZoomMenu />
        <InfoModal />
        <TipToasts showTips={showTips} setShowTips={setShowTips} />
        <WarningToast
          showWarning={showWarning}
          setShowWarning={setShowWarning}
        />
      </MapContainer>
    </div>
  );
}

export default App;
