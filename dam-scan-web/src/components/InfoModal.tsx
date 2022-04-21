import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import "../index.css"; // holds the css needed for the modal
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { CloseButton, ModalFooter } from "react-bootstrap";
import "../index.css";
import qrCode from "../assets/qr-code.png";

const InfoButton = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  background-color: #0883eb;
  color: white;
  width: 35px;
  height: 35px;
  top: 10px;
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

function InformationModal(props: any) {
  return (
    <Modal {...props} size="lg" className="InformationModal">
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontWeight: 600 }}
        >
          About DamScan
        </Modal.Title>
        <CloseButton
          className={"close-button"}
          variant="white"
          onClick={props.onHide}
        />
      </Modal.Header>
      <br />
      <Modal.Body style={{ fontSize: 13 }}>
        <p>
          Hello and welcome to DamScan! Collaborate with us in a project where
          students, staff, and community members create a historical digital
          archive of the Oregon State University campus. Download our iOS
          application below and help contribute to our archive. Then, view scans
          that you and many others have submitted here on our website!
        </p>

        <div style={{ paddingTop: 20 }}>
          <h6>Developed by:</h6>
          <p>Kristina Lee</p>
          <p>Gavin Gutowsky</p>
          <p>Cristian Garibay</p>
        </div>

        <h6 style={{ paddingTop: 20 }}>
          Download our app from the iOS App Store:
        </h6>
        <img
          src={qrCode}
          alt={"Dam Scan QR code"}
          style={{ width: 100, height: 100 }}
        />
      </Modal.Body>
      <br />
      <ModalFooter>Qr code here</ModalFooter>
    </Modal>
  );
}

function InfoModal() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <InfoButton onClick={() => setModalShow(true)}>
        <FontAwesomeIcon
          icon={faInfoCircle}
          color="#white"
          style={{ margin: "auto" }}
        />
      </InfoButton>
      <InformationModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default InfoModal;
