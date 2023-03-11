import React from 'react';
import {
  Flex,
  useDisclosure,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import SidebarContent from './SidebarContent';
import { SidebarContentType } from './SidebarContentType';

type Props = {
    sidebarContent:Array<SidebarContentType>
};

const Sidebar = ({ sidebarContent }:Props) => {
  const sidebar = useDisclosure();
  const { t } = useTranslation();
  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: 'gray.700',
      }}
      minH="100vh"
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
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: 'gray.800',
          }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: 'inline-flex',
              md: 'none',
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />

        </Flex>

        <Box as="main" w="full" p="4">
          {/* Add content here, remove div below  */}
          <Box borderWidth="4px" borderStyle="dashed" rounded="md" w="full" h="96" />
        </Box>
      </Box>
    </Box>
  );
};
export default Sidebar;
