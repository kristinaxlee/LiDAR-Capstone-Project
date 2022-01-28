import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSearchMinus,
  faSearchPlus,
  faStreetView,
} from "@fortawesome/free-solid-svg-icons";
import { IconContainer } from "./ui/ZoomMenuUI";

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
