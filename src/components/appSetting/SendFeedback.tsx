import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { open } from '@tauri-apps/api/shell';
import { Button, Modal, ButtonGroup } from 'react-daisyui';
import { FcFeedback } from 'react-icons/fc';
import { MdClose } from 'react-icons/md';

const SendFeedback = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Button
        startIcon={<FcFeedback />}
        size="xs"
        fullWidth
        onClick={toggleVisible}
        className="mt-2"
      >
        {t('starterFeedback')}
      </Button>

      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <Button
          size="sm"
          shape="square"
          className="absolute right-2 top-2"
          onClick={toggleVisible}
          startIcon={<MdClose />}
        />
        <Modal.Header>{t('chooseFeedbackWay')}</Modal.Header>
        <Modal.Body className="flex justify-center">
          <ButtonGroup>
            <Button
              color="warning"
              variant="outline"
              onClick={async () => {
                await open(
                  'https://github.com/oguzkaganeren/manjaro-starter/issues',
                );
              }}
            >
              Github
            </Button>
            <Button
              color="success"
              variant="outline"
              onClick={async () => {
                await open(
                  'https://forum.manjaro.org/t/hello-manjaro-starter/101015',
                );
              }}
            >
              Forum
            </Button>
          </ButtonGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SendFeedback;
