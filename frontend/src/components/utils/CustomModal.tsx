import React, { FC, useState } from 'react';

import { Modal } from 'react-bootstrap';

interface Props {
  activateButtonElement: string | React.ReactNode;
  activateButtonClassName?: string;
  activateButtonOnClick?: () => void;
  modalHeader?: React.ReactNode;
  modalBody: React.ReactNode;
  onCloseFunction?: () => void;
  modalClassName?: string;
}

const CustomModal: FC<Props> = ({
  activateButtonElement,
  activateButtonClassName,
  activateButtonOnClick,
  modalHeader,
  modalBody,
  modalClassName,
  onCloseFunction
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    onCloseFunction && onCloseFunction();
  };
  const handleShow = () => setShow(true);

  const handleButtonClick = () => {
    handleShow();
    activateButtonOnClick && activateButtonOnClick();
  };

  return (
    <>
      <div
        role={'button'}
        className={activateButtonClassName && activateButtonClassName}
        onClick={handleButtonClick}
      >
        {activateButtonElement}
      </div>

      <Modal
        centered
        animation
        show={show}
        onHide={handleClose}
        className={modalClassName && modalClassName}
      >
        {modalHeader && (
          <Modal.Header closeButton>
            <Modal.Title className="w-100">
              <>{modalHeader}</>
            </Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body className="m-0 p-0">
          <>{modalBody}</>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
