import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function PopupModal({ enter }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    enter();
  };
  const handleShow = () => setShow(true);

  const leave = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} hidden>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Disclaimer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          -- This is a student project so expect bugs <br />
          -- If remote user video donot get connected rejoin the meeting
          <br />
          -- Meeting is not encypted so donot share any critical information.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={leave}>
            Leave
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupModal;
