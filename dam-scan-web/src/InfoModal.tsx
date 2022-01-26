import React, { useEffect, useRef, useState } from "react";
import Modal  from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from "styled-components";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInfoCircle
  } from "@fortawesome/free-solid-svg-icons";
const InfoButton = styled.div`
  background-color: #0883eb;
  text-align: center;
  width: 100%;
  color: white;
  width: 20px;
  height: 20px;
  top: 10px;
  border-radius: 40px;
  position: absolute;
  right: 10px;
  font-size: 15px;
  transition: transform 0.2s;
  &: hover {
    transform: scale(1.05);
  }
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
`;

function InformationModal(props:any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            About DamScan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            BLAH  BLAH  BLAH  BLAH  BLAH  BLAH  BLAH  BLAH  BLAH  BLAH  BLAH  BLAH  BLAH BLAH  BLAH  BLAH  BLAH  BLAH  
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

function InfoModal(){
    const [modalShow, setModalShow] = React.useState(false);

return(
    
<>
  <InfoButton onClick={() =>setModalShow(true)} ><FontAwesomeIcon
            icon={faInfoCircle}
            color="#white"
          />
</InfoButton>
<InformationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
</>

);

}

export default InfoModal;