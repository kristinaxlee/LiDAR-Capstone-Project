import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import styled from "styled-components";
import logo from "../assets/radar.png";
import logoBlue from "../assets/radar_blue.png";
import leftMouse from "../assets/Mouse_Left_Key_Dark.png";
import middleMouse from "../assets/Mouse_Middle_Key_Dark.png";
import rightMouse from "../assets/Mouse_Right_Key_Dark.png";
import "../index.css";

const TipButton = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  background-color: #0883eb;
  color: white;
  width: 35px;
  height: 35px;
  top: 60px;
  border-radius: 10px;
  position: absolute;
  right: 10px;
  font-size: 20px;
  transition: transform 0.2s;
  &: hover {
    transform: scale(1.05);
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const ImgContainer = styled.img`
  height: 20px;
`;

const TipToasts = (props: any) => {
  const { showTips, setShowTips } = props;
  const toggleShowTips = () => {
    setShowTips(false);
  };

  return (
    <>
      <ToastContainer position="top-center">
        <Toast show={showTips} onClose={toggleShowTips} className="quickTips">
          <Toast.Header>
            <ImgContainer className="rounded me-2" src={logoBlue} />
            <strong className="me-auto"> Quick Tips</strong>
          </Toast.Header>
          <Toast.Body>
            <ImgContainer src={leftMouse} />
            To rotate the object
            <br />
            <ImgContainer src={middleMouse} />
            Scroll to zoom in and out
            <br />
            <ImgContainer src={rightMouse} />
            To move the object
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

const WarningToast = (props: any) => {
  const { showWarning, setShowWarning } = props;
  const toggleShowWarningToast = () => {
    setShowWarning(false);
  };

  return (
    <div>
      <ToastContainer position="top-center">
        <Toast
          show={showWarning}
          bg={"danger"}
          onClose={toggleShowWarningToast}
          className="Warning"
        >
          <Toast.Header>
            <ImgContainer className="rounded me-2" src={logo} />
            <strong className="me-auto"> Warning</strong>
          </Toast.Header>
          <Toast.Body>Please select a room and a date</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export { TipToasts, WarningToast };
