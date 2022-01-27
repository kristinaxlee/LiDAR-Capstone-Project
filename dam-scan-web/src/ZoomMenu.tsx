import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      id: "zoom-center",
      key: 1,
      icon: faStreetView,
      offset: 130,
    },
    {
      id: "zoom-in",
      key: 2,
      icon: faSearchPlus,
      offset: 70,
    },
    {
      id: "zoom-out",
      key: 3,
      icon: faSearchMinus,
      offset: 10,
    },
  ];

  return (
    <>
      {buttonInfo.map((button: any) => (
        <IconContainer
          id={button.id}
          key={button.key}
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
