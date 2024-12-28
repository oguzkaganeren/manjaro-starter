import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  ButtonGroup,
  PopoverFooter,
} from '@chakra-ui/react';
import { open } from '@tauri-apps/plugin-shell';
import { MdFeedback } from 'react-icons/md';

const SendFeedback = () => {
  const { t } = useTranslation();
  return (
    <Popover>
      <PopoverTrigger>
        <Button leftIcon={<MdFeedback />} size="xs">{t('starterFeedback')}</Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{t('chooseFeedbackWay')}</PopoverBody>
        <PopoverFooter border="0">
          <ButtonGroup size="xs">
            <Button
              colorScheme="orange"
              onClick={async () => {
                await open(
                  'https://github.com/oguzkaganeren/manjaro-starter/issues',
                );
              }}
            >
              Github
            </Button>
            <Button
              colorScheme="green"
              onClick={async () => {
                await open(
                  'https://forum.manjaro.org/t/hello-manjaro-starter/101015',
                );
              }}
            >
              Forum
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default SendFeedback;
