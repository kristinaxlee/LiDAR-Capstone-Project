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

const ButtonContainer = styled.div`
  background-color: #0883eb;
  color: white;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  padding: 10px;
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
        <ButtonContainer
          key={button.id}
          style={{ bottom: button.offset }}
          onClick={button.clickHandler}
        >
          <FontAwesomeIcon
            style={{ display: "block", margin: "auto" }}
            icon={button.icon}
            color="#white"
          />
        </ButtonContainer>
      ))}
    </>
  );
}
export default ZoomMenu;