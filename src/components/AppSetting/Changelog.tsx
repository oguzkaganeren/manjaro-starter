import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
  Box,
  ModalContent,
  Text,
  Heading,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { open } from '@tauri-apps/api/shell';
import notes from '../../CHANGELOG.md';

const newTheme = {
  a: (props: any) => {
    const { children, href } = props;

    return (
      <Button
        variant="link"
        whiteSpace="initial"
        size="sm"
        onClick={async () => {
          await open(href);
        }}
      >
        <Text as="u">{children}</Text>
      </Button>
    );
  },
  h3: (props: any) => {
    const { children } = props;
    return (
      <Heading as="h6" size="xs">
        {children}
      </Heading>
    );
  },
  h2: (props: any) => {
    const { children } = props;
    return (
      <Heading as="h5" size="xs">
        {children}
      </Heading>
    );
  },
  h1: (props: any) => {
    const { children } = props;
    return (
      <Heading as="h4" size="xs">
        {children}
      </Heading>
    );
  },
};

const Changelog = () => {
  const { t } = useTranslation();
  const [mdContent, setMdContent] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch(notes)
      .then((response) => response.text())
      .then((text) => {
        setMdContent(text);
      });
  }, []);
  return (
    <Box>
      <Button size="xs" onClick={onOpen}>
        {t('appChangelog')}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropBlur="2px" />
        <ModalContent p={4}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={ChakraUIRenderer(newTheme)}
          >
            {mdContent}
          </ReactMarkdown>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Changelog;
