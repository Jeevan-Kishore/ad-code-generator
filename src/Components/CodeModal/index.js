'use client';

import { Button, Modal } from 'flowbite-react';
import { ModalContent } from '../ModalContent';
import { getWidgetCode } from '../../utils/generate-widget';

export function CodeModal({ openModal, setOpenModal, modalBody }) {
  const { adName } = modalBody;
  const copyContent = async () => {
    try {
      const template = getWidgetCode(modalBody);
      await navigator.clipboard.writeText(template);
      setOpenModal(false);
      console.log('Content copied to clipboard');
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      console.error('Failed to copy: ', err);
      setOpenModal(false);
      /* Rejected - text failed to copy to the clipboard */
    }
  };

  return (
    <Modal
      dismissible
      size="7xl"
      show={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>
        Widget code - AD unit -
        {adName}
      </Modal.Header>
      <Modal.Body>
        <ModalContent modalBody={modalBody} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={copyContent}>Copy</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
