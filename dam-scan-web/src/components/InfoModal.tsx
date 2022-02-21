import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import "../index.css"; // holds the css needed for the modal
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { CloseButton, ModalFooter } from "react-bootstrap";
import "../index.css";

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
      <Modal.Body>
        <p>
          Bacon ipsum dolor amet cow brisket pork chop hamburger pig ham hock
          short ribs ground round. Shoulder pastrami ground round filet mignon
          chislic. Corned beef cow venison chicken porchetta prosciutto
          bresaola. Biltong spare ribs ball tip fatback.
        </p>
        <p>
          Venison kielbasa t-bone shoulder, drumstick tenderloin frankfurter
          sausage beef turducken salami porchetta bacon. Shank ball tip turkey,
          chislic pig hamburger cupim capicola alcatra shankle landjaeger jowl
          shoulder jerky chicken. Boudin jerky shoulder, ham doner strip steak
          pork chop chicken tongue sirloin prosciutto tri-tip. Beef ribs pork
          meatball corned beef turducken. Tail jerky tri-tip, bacon pork loin
          andouille ground round spare ribs.
        </p>
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
