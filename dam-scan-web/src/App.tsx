import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import "./App.css";
import SideMenu from "./components/SideMenu";
import ZoomMenu from "./components/ZoomMenu";
import InfoModal from "./components/InfoModal";
import { init } from "./threeFunctions";
import TipToasts from "./components/Toasts";
import Toast  from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

import logo from "./assets/radar.png";
export const SiteLogoBlue = styled.img`
  height: 20px;
  padding-left: 20px;
`;
function WarningToast(){
  const [showWarningToast, SetShowWarningToast]= useState(true);
    const toggleShowWarningToast = () => SetShowWarningToast(!showWarningToast);
    return(
      <div>
        
      <ToastContainer position="top-center">
        
      <Toast show={showWarningToast} bg= {"Warning"} onClose={toggleShowWarningToast}  delay={4000} autohide className="Warning">
        <Toast.Header>
        <SiteLogoBlue src={logo}/>
          <strong>Warning</strong>
        </Toast.Header> 
        <Toast.Body>
          Please select a room and a date
        
        </Toast.Body>
        
      </Toast>
      </ToastContainer>
      </div>
    );
}
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
  const [error, setError] = useState(true)
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
        setError = {setError}
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
        
        
        {(!(titles.curDate && titles.curRoom) && !error && titles.displayClicked)&& <div>
        <WarningToast/>
        </div>}
        
        
      </MapContainer>
    </div>
  );
}

export default App;
