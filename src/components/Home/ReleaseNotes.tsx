import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
  Box,
  ModalContent,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import notes from '../../assets/ReleaseNotes.md';

const ReleaseNotes = () => {
  const { t } = useTranslation();
  const [mdContent, setMdContent] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch(notes).then((response) => response.text()).then((text) => {
      setMdContent(text);
    });
  }, []);
  return (
    <Box>
      <Button onClick={onOpen}>
        {t('releaseNotes')}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl" motionPreset="slideInBottom">
        <ModalOverlay
          backdropBlur="2px"
        />
        <ModalContent p={4}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={ChakraUIRenderer()}
          >
            {mdContent}

          </ReactMarkdown>
        </ModalContent>
      </Modal>
    </Box>

  );
};

export default ReleaseNotes;
