import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, CloseIcon } from '@chakra-ui/icons';
import { appWindow } from '@tauri-apps/api/window';
import { BiWindow } from 'react-icons/bi';
import { MdOutlineMinimize } from 'react-icons/md';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="header"
        pos="fixed"
        top="0"
        w="full"
        boxShadow="sm"
        zIndex="999"
        justify="flex-end"
        css={{
          backdropFilter: 'saturate(180%) blur(5px)',
          backgroundColor: useColorModeValue(
            'rgba(255, 255, 255, 0.8)',
            'rgba(26, 32, 44, 0.8)',
          ),
        }}
      >
        <Flex h={16} mr={5} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={7}>
            <ButtonGroup>
              <IconButton aria-label="Minimize" size="sm" icon={<MdOutlineMinimize />} />
              <IconButton aria-label="Window" size="sm" icon={<BiWindow />} />
              <IconButton aria-label="Close" size="sm" icon={<CloseIcon />} />
            </ButtonGroup>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
