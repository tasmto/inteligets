import React, { PropTypes, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

{
  /* <Modal msg="..' type='confirm' onConfrim='...' onCancel=''> */
}

const CustomModal = ({
  title = 'Note:',
  msg,
  type = 'normal',
  onConfirm,
  onCancel,
  children = null,
}) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    if (onCancel) onCancel();
  };
  const handleConfirm = () => {
    setShow(false);
    if (onConfirm) onConfirm();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop='static'
      centered
      keyboard={false}
    >
      <Modal.Header closeButton>
        {title && <Modal.Title>{title}</Modal.Title>}
      </Modal.Header>
      {(msg || children) && <Modal.Body>{children || msg}</Modal.Body>}
      <Modal.Footer>
        <Button variant='info' onClick={handleClose}>
          Close
        </Button>
        {type === 'confirm' && (
          <Button variant='danger' onClick={handleConfirm}>
            Yes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
