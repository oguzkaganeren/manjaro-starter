import React from 'react';
import {
  useDisclosure,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import SidebarContent from './SidebarContent';
import { SidebarContentType } from './SidebarContentType';
import SystemInfoComponent from '../../systemConfig/SystemInfo';

type Props = {
    sidebarContent:Array<SidebarContentType>
};

const Sidebar = ({ sidebarContent }:Props) => {
  const sidebar = useDisclosure();
  return (
    <Box
      as="section"
      mt={59}
    >
      <SidebarContent
        otherProps={{
          display: {
            base: 'none',
            md: 'unset',
          },
        }}
        sidebarContent={sidebarContent}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent
            otherProps={{
              w: 'full',
              borderRight: 'none',
            }}
            sidebarContent={sidebarContent}
          />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <IconButton
          aria-label="Menu"
          pos="fixed"
          zIndex="sticky"
          display={{
            base: 'inline-flex',
            md: 'none',
          }}
          onClick={sidebar.onOpen}
          icon={<FiMenu />}
          size="sm"
        />

        <Box as="main" w="full" pr="4">
          {/* Add content here, remove div below  */}
          <SystemInfoComponent />
        </Box>
      </Box>
    </Box>
  );
};
export default Sidebar;
