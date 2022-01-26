import React from "react";
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

const IconContainer = styled.div`
  display: flex;
  text-align: center;
  background-color: #0883eb;
  color: white;
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 15px;
  position: absolute;
  right: 10px;
  font-size: 30px;
  transition: transform 0.2s;
  &: hover {
    transform: scale(1.05);
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

function ZoomMenu(props: any) {
  const buttonInfo = [
    {
      id: 1,
      icon: faStreetView,
      offset: 130,
      clickHandler: () => {
        console.log("center button clicked!");
      },
    },
    {
      id: 2,
      icon: faSearchPlus,
      offset: 70,
      clickHandler: () => {
        console.log("zoom out button clicked!");
      },
    },
    {
      id: 3,
      icon: faSearchMinus,
      offset: 10,
      clickHandler: () => {
        console.log("zoom out button clicked!");
      },
    },
  ];

  return (
    <>
      {buttonInfo.map((button: any) => (
        <IconContainer
          key={button.id}
          style={{ bottom: button.offset }}
          onClick={button.clickHandler}
        >
          <FontAwesomeIcon
            icon={button.icon}
            color="#white"
            style={{ margin: "auto" }}
          />
        </IconContainer>
      ))}
    </>
  );
}
export default ZoomMenu;
