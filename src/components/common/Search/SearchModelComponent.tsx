import React, { useImperativeHandle } from 'react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  chakra,
  forwardRef,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useDebounce } from 'use-debounce';

import { useTranslation } from 'react-i18next';
import SearchResults from './SearchResults';

export default forwardRef<
  { ref: React.MutableRefObject<UseDisclosureReturn | null> },
  'div'
>((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const idParam = _.id;
  const plcText = idParam === 'package'
    ? t('searchPackagePlaceHolder')
    : t('searchInfoPlaceHolder');
  useImperativeHandle(ref, () => ({
    isOpen,
    onOpen,
    onClose,
  }));

  const [search, setSearch] = React.useState('');
  const [value] = useDebounce(search, 500);
  React.useEffect(() => {
    !isOpen && setSearch('');
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size="xl"
    >
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent mt="5rem" bg="white" _dark={{ bg: '#111' }}>
        <ModalBody p={25}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="brand.400" boxSize={5} mr={5} />
            </InputLeftElement>
            <Input
              variant="flushed"
              placeholder={plcText}
              size="lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
              <Kbd
                color="gray.500"
                rounded="2px"
                cursor="pointer"
                onClick={onClose}
              >
                <chakra.div
                  as="abbr"
                  title="Close search"
                  textDecoration="none !important"
                >
                  esc
                </chakra.div>
              </Kbd>
            </InputRightElement>
          </InputGroup>
          {value.length > 0 && (
            <SearchResults
              isForPackage={idParam === 'package'}
              searchText={value}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
