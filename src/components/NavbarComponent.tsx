import {
  Flex,
  useColorModeValue,
  Stack,
  IconButton,
  ButtonGroup,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { appWindow } from '@tauri-apps/api/window';
import { BiWindow } from 'react-icons/bi';
import { MdOutlineMinimize } from 'react-icons/md';
import AppSettings from './AppSettings';
import ThemeComponent from './ThemeComponent';

const NavbarComponent: React.FC = () => (
  <Flex
    as="header"
    pos="fixed"
    top="0"
    w="full"
    boxShadow="sm"
    justify="flex-end"
    zIndex={998}
    css={{
      backdropFilter: 'saturate(180%) blur(5px)',
      backgroundColor: useColorModeValue(
        'rgba(255, 255, 255, 0.8)',
        'rgba(26, 32, 44, 0.8)',
      ),
    }}
  >
    <div data-tauri-drag-region className="titlebar" />
    <Flex h={16} alignItems="center" justifyContent="space-between" />
    <Spacer />
    <Flex h={16} mr={5} alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={2}>
        <ThemeComponent />
        <AppSettings />
        <ButtonGroup>

          <IconButton aria-label="Minimize" onClick={() => { appWindow.minimize(); }} size="sm" icon={<MdOutlineMinimize />} />
          <IconButton aria-label="Window" onClick={() => { appWindow.toggleMaximize(); }} size="sm" icon={<BiWindow />} />
          <IconButton aria-label="Close" onClick={() => { appWindow.close(); }} size="sm" icon={<CloseIcon />} />
        </ButtonGroup>
      </Stack>
    </Flex>
  </Flex>
);
export default NavbarComponent;
