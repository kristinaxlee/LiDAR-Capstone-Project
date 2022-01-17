import React, { useState } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import CameraControls from 'camera-controls';
import {
  faSearchMinus,
  faSearchPlus,
  faStreetView,
} from "@fortawesome/free-solid-svg-icons";


  const CenterButton = styled.div`
  background-color: #0883eb;
  color: white;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  font-size: 30px;
  padding: 10px;
  position:absolute;
  bottom: 125px;
  right: 10px;
  transition: transform 0.2s;
  &: hover {
    transform: scale(1.05);
  }
 
`;
  const ZoomOut = styled.div`
  background-color: #0883eb;
  color: white;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  padding: 10px;
  position:absolute;
  bottom: 5px;
  right: 10px;
  font-size: 30px;
  transition: transform 0.2s;
  &: hover {
    transform: scale(1.05);
 
`;
const ZoomIn = styled.div`

background-color: #0883eb;
color: white;
width: 30px;
height: 30px;
text-align: center;
border-radius: 15px;
padding: 10px;
position:absolute;
bottom: 65px;
right: 10px;
font-size: 30px;
transition: transform 0.2s;
&: hover {
  transform: scale(1.05);
}
`;

function ZoomMenu(props: any) {
    function HandleCenter(e: any) {
        
    }
    return (
     <>
     <div>
     <ZoomIn><FontAwesomeIcon
                style={{ display: "block", margin: "auto",}}
                icon={faSearchPlus}
                color="#white"
                font-size="50px"
              />
    </ZoomIn>

     <ZoomOut><FontAwesomeIcon
                style={{ display: "block", margin: "auto",}}
                icon={faSearchMinus}
                color="#white"
                font-size="50px"
              />
    </ZoomOut>

     <CenterButton onClick={HandleCenter}><FontAwesomeIcon
                style={{ display: "block", margin: "auto",}}
                icon={faStreetView}
                color="#white"
                font-size="50px"
              />
    </CenterButton>
              
     </div>
     
     </>
     
    );
  }
  export default ZoomMenu;