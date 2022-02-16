
import React, { useState }  from "react";
import Toast  from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import styled from "styled-components";
import CloseButton from 'react-bootstrap/CloseButton'
import 'bootstrap/dist/css/bootstrap.css';
import { faCommentAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/radar_blue.png";
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
export const SiteLogoBlue = styled.img`
  height: 20px;
  padding-left: 20px;
`;
export const LeftMouse = styled.img`
  height: 20px;
  padding-left: 20px;
`;
export const MiddleMouse = styled.img`
  height: 20px;
  padding-left: 20px;
`;
export const RightMouse = styled.img`
  height: 20px;
  padding-left: 20px;
`;

function TipToasts(){
    
    const [showToast, SetShowToast]= useState(true);
    const toggleShowToast = () => SetShowToast(!showToast);
    return(
        <>
        
       
      <ToastContainer position="top-center">
        
      <Toast show={showToast} onClose={toggleShowToast}  delay={2000} autohide className="quickTips">
        <Toast.Header>
        <SiteLogoBlue src={logo}/>
          <strong> Quick Tips</strong>
        </Toast.Header> 
        <Toast.Body><LeftMouse src={leftMouse}/>To move the object 
        <br/> <MiddleMouse src={middleMouse}/>Scroll to zoom in and out
        <br/> <RightMouse src={rightMouse}/>To pan the object
        
        </Toast.Body>
        
      </Toast>
      </ToastContainer>
      </>
    );
  


}







export default TipToasts;



