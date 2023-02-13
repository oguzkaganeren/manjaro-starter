import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

import { useRecoilValue } from 'recoil';
import notes from '../../../assets/ReleaseNotes.md';
import { connectionState } from '../../../stores/ConnectionStore';
import LanguageList from './LanguageList';
import useTranslateHook from './useTranslateHook';

const ReleaseNotes = () => {
  const { t } = useTranslation();
  const [mdContent, setMdContent] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isOnline = useRecoilValue(connectionState);
  const { selectedLanguage, translatedContent, getTranslatedContent } = useTranslateHook();
  useEffect(() => {
    fetch(notes).then((response) => response.text()).then((text) => {
      setMdContent(text);
    });
  }, []);

  return (
    <>
      <Button variant="link" colorScheme="blue" size="sm" onClick={onOpen}>
        {t('releaseNotes')}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropBlur="2px" />

        <ModalContent p={4}>
          <ModalHeader>{isOnline && <LanguageList />}</ModalHeader>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={ChakraUIRenderer()}
          >
            {selectedLanguage === 'en'
              ? mdContent
              : translatedContent}
          </ReactMarkdown>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReleaseNotes;
