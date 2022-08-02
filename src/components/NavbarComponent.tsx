import { ReactNode } from 'react';
import {
  Flex,
  useColorModeValue,
  Stack,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { appWindow } from '@tauri-apps/api/window';
import { BiWindow } from 'react-icons/bi';
import { MdOutlineMinimize } from 'react-icons/md';

export default function Nav() {
  return (
    <>
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
        <Flex h={16} mr={5} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={7}>
            <ButtonGroup>
              <IconButton aria-label="Minimize" onClick={() => { appWindow.minimize(); }} size="sm" icon={<MdOutlineMinimize />} />
              <IconButton aria-label="Window" onClick={() => { appWindow.toggleMaximize(); }} size="sm" icon={<BiWindow />} />
              <IconButton aria-label="Close" onClick={() => { appWindow.close(); }} size="sm" icon={<CloseIcon />} />
            </ButtonGroup>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
