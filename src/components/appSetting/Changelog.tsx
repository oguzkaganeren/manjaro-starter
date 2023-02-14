import React, { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import remarkGfm from 'remark-gfm';
import { open } from '@tauri-apps/api/shell';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { Button, Modal, Card } from 'react-daisyui';
import { MdClose } from 'react-icons/md';
import notes from '../../CHANGELOG.md';

const newTheme = {
  a: (props: any) => {
    const { children, href } = props;

    return (
      <Button
        variant="outline"
        size="sm"
        color="success"
        onClick={async () => {
          await open(href);
        }}
      >
        {children}
      </Button>
    );
  },
  h3: (props: any) => {
    const { children } = props;
    return (
      <Card.Title tag="h6">{children}</Card.Title>
    );
  },
  h2: (props: any) => {
    const { children } = props;
    return (
      <Card.Title tag="h5">
        {children}
      </Card.Title>
    );
  },
  h1: (props: any) => {
    const { children } = props;
    return (
      <Card.Title tag="h4">
        {children}
      </Card.Title>
    );
  },
};

const Changelog = () => {
  const { t } = useTranslation();
  const [mdContent, setMdContent] = useState('');
  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    fetch(notes)
      .then((response) => response.text())
      .then((text) => {
        setMdContent(text);
      });
  }, []);
  return (
    <div className="font-sans">
      <Button
        startIcon={<HiOutlineDocumentText />}
        size="xs"
        fullWidth
        onClick={toggleVisible}
      >
        {t('appChangelog')}
      </Button>

      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <Button
          size="sm"
          shape="square"
          className="absolute right-2 top-2"
          onClick={toggleVisible}
          startIcon={<MdClose />}
        />
        <Modal.Body>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={newTheme}>
            {mdContent}
          </ReactMarkdown>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Changelog;
