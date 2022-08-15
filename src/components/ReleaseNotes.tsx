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
  Link,
  DrawerFooter,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { open } from '@tauri-apps/api/shell';
import { default as SocialLinks } from '../assets/SocialUrls.json';

  interface ReleaseNotesProps {
  }

const ReleaseNotes: React.FC<ReleaseNotesProps> = (props) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
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
          <Link
            px={3}
            py={1}
            bg="gray.600"
            color="gray.100"
            fontSize="sm"
            fontWeight="700"
            rounded="md"
            _hover={{
              bg: 'gray.500',
            }}
          >
            -
          </Link>
        </Flex>

        <Box mt={2}>
          <Link
            fontSize="2xl"
            color="gray.700"
            _dark={{
              color: 'white',
            }}
            fontWeight="700"
            _hover={{
              color: 'gray.600',
              _dark: {
                color: 'gray.200',
              },
              textDecor: 'underline',
            }}
          >
            -
          </Link>
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
