import {
  DrawerHeader,
  DrawerBody,
  Button,
  useDisclosure,
  Drawer,
  Flex,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  chakra,
  DrawerFooter,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { open } from '@tauri-apps/api/shell';
// eslint-disable-next-line import/no-named-default
import { default as SocialLinks } from '../../assets/SocialUrls.json';

const ReleaseNotesContent = () => (
  <Flex
    bg="#edf3f8"
    _dark={{
      bg: '#3e3e3e',
    }}
    w="full"
    alignItems="center"
    justifyContent="center"
  >
    <Box
      mx="auto"
      px={8}
      py={4}
      rounded="lg"
      shadow="lg"
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      maxW="2xl"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <chakra.span
          fontSize="sm"
          color="gray.600"
          _dark={{
            color: 'gray.400',
          }}
        >
          -
        </chakra.span>
      </Flex>

      <Box mt={2}>
        <chakra.p
          mt={2}
          color="gray.600"
          _dark={{
            color: 'gray.300',
          }}
        >
          -
        </chakra.p>
      </Box>

    </Box>
  </Flex>
);
const ReleaseNotes: React.FC = () => {
  const { t } = useTranslation();
  const { isOpen, onClose } = useDisclosure();

  return (
    <Flex
      justifyContent="right"
      alignItems="top"
    >
      <Button
        px={3}
        py={1}
        fontSize="sm"
        fontWeight="700"
        rounded="md"
        onClick={async () => { await open(SocialLinks.urls.blog); }}
      >
        {t('releaseNotes')}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{t('releaseNotes')}</DrawerHeader>

          <DrawerBody>
            <ReleaseNotesContent />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Manjaro Blog
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </Flex>
  );
};
export default ReleaseNotes;
