import {
  Flex,
  useColorModeValue,
  useColorMode,
  Stack,
  IconButton,
  ButtonGroup,
  Spacer,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Portal,
  Button,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import { CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { appWindow } from '@tauri-apps/api/window';
import { BiWindow } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineMinimize } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import LanguageComponent from './LanguageComponent';
import StartLaunch from './StartLaunch';
import AboutComponent from './AboutComponent';

const AppMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        size="sm"
        aria-label="Options"
        icon={<GiHamburgerMenu />}
      />
      <Portal>
        <MenuList zIndex="popover">
          <MenuItem>
            <LanguageComponent />
          </MenuItem>
          <MenuItem>
            <StartLaunch />
          </MenuItem>
          <MenuItem onClick={toggleColorMode}>
            <HStack>
              <span>{t('colorMode')}</span>
              <Spacer />
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </HStack>

          </MenuItem>
          <AboutComponent />
        </MenuList>
      </Portal>

    </Menu>
  );
};
const NavbarComponent: React.FC = () => (
  <Flex
    as="header"
    pos="fixed"
    top="0"
    w="full"
    boxShadow="sm"
    justify="flex-end"
    css={{
      backdropFilter: 'saturate(180%) blur(5px)',
      backgroundColor: useColorModeValue(
        'rgba(255, 255, 255, 0.8)',
        'rgba(26, 32, 44, 0.8)',
      ),
    }}
  >
    <Flex h={16} alignItems="center" justifyContent="space-between" />

    <Spacer />
    <Flex h={16} mr={5} alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={7}>
        <AppMenu />
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
