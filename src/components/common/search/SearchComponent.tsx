import React from 'react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import {
  Flex,
  HStack,
  Kbd,
  Text,
  VisuallyHidden,
  chakra,
  useEventListener,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import SearchModelComponent from './SearchModelComponent';
import connectionState from '../../../stores/ConnectionStore';

const ACTION_KEY_DEFAULT = ['Ctrl', 'Control'];
const ACTION_KEY_APPLE = ['⌘', 'Command'];

interface SearchProps {
  isForPackage: boolean;
}
const SearchComponent = (props: SearchProps) => {
  const { isForPackage } = props;
  const isOnline = useRecoilValue(connectionState);
  const searchModal = React.useRef<UseDisclosureReturn | null>(null);
  const [actionKey, setActionKey] = React.useState(ACTION_KEY_APPLE);
  const { t } = useTranslation();
  const openSearchModal = () => {
    searchModal.current?.onOpen();
  };
  React.useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
    if (!isMac) {
      setActionKey(ACTION_KEY_DEFAULT);
    }
  }, []);
  useEventListener('keydown', (event) => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.userAgent);
    const hotkey = isMac ? 'metaKey' : 'ctrlKey';
    if (event.key.toLowerCase() === 'f' && event[hotkey]) {
      event.preventDefault();
      openSearchModal();
    }
  });

  return (
    <Flex hidden={!isOnline}>
      <SearchModelComponent
        id={isForPackage ? 'package' : 'anything'}
        ref={searchModal}
      />
      <chakra.button
        flex="1"
        type="button"
        role="search"
        lineHeight="1.2"
        w="full"
        _dark={{
          bg: 'blackAlpha.400',
        }}
        whiteSpace="nowrap"
        display="flex"
        alignItems="center"
        color="gray.400"
        py="3"
        px="4"
        outline="0"
        _focus={{ shadow: 'outline' }}
        shadow="base"
        rounded="md"
        onClick={openSearchModal}
      >
        <SearchIcon />
        <HStack w="full" ml="3" spacing="4px">
          <Text textAlign="left" flex="1">
            {isForPackage
              ? t('searchPackagePlaceHolder')
              : t('searchPlaceHolder')}
          </Text>
          <HStack spacing="4px" display={{ base: 'none', md: 'flex' }}>
            <VisuallyHidden>Press </VisuallyHidden>
            <Kbd color="gray.500" rounded="2px">
              <chakra.div
                as="abbr"
                title={actionKey[1]}
                textDecoration="none !important"
              >
                {actionKey[0]}
              </chakra.div>
            </Kbd>
            <VisuallyHidden> and </VisuallyHidden>
            <Kbd color="gray.500" rounded="2px">
              F
            </Kbd>
            <VisuallyHidden> to search</VisuallyHidden>
          </HStack>
        </HStack>
      </chakra.button>
    </Flex>
  );
};
export default SearchComponent;
