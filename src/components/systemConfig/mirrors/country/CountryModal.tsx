import {
  Button, Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import commands from '../../../../assets/Commands';
import connectionState from '../../../../stores/ConnectionStore';
import countryState from '../../../../stores/CountryStore';
import ConfirmPopComponent from '../../../common/ConfirmPopComponent';
import CountryList from './CountryList';
import useCountryHook from './useCountryHook';

const CountryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const { countryParam, callCountryMirrorCommand, isProcessing } = useCountryHook();
  const checkedItems = useRecoilValue(countryState);
  const isOnline = useRecoilValue(connectionState);

  return (
    <>
      <Button onClick={onOpen}>{t('customizeMirror')}</Button>

      <Modal size="xl" onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('availableCountries')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody minH="xs">
            <Text mb={5}>{t('pacmanMirrorCountryDesc')}</Text>

            <CountryList />
          </ModalBody>
          <ModalFooter mt={5}>
            <ConfirmPopComponent
              confirmationDesc="confirmDesc"
              isButtonDisabled={
                checkedItems.size === 0 || !isOnline || isProcessing
              }
              handleClick={callCountryMirrorCommand}
              portalEnabled={false}
              commands={[
                `${(commands.countryMirror.args as Array<string>)
                  .map((text) => `${text}`)
                  .join(' ')} ${countryParam}`,
              ]}
            >
              <Button
                isDisabled={
                  checkedItems.size === 0 || !isOnline || isProcessing
                }
                isLoading={isProcessing}
                colorScheme="green"
              >
                {t('apply')}
              </Button>
            </ConfirmPopComponent>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CountryModal;
