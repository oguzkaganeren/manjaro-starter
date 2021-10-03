import { ReactText, ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  HStack,
  Button,
  VisuallyHidden,
  Stack,
} from '@chakra-ui/react';
import {
  FaDiscourse, FaWikipediaW, FaYoutube, FaTwitter, FaFacebook,
} from 'react-icons/fa';
import {
  FiHome,
  FiCompass,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

interface LinkItemProps {
  name: string;
  icon: IconType;
  route:string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, route: 'home' },
  { name: 'Explore', icon: FiCompass, route: 'explore' },
  { name: 'Settings', icon: FiSettings, route: 'settings' },
];
const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => (
  <Button
    bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
    rounded="full"
    w={8}
    h={8}
    cursor="pointer"
    as="a"
    href={href}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="background 0.3s ease"
    _hover={{
      bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
    }}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </Button>
);
export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Router>
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      </Box>
    </Router>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => (
  <Box
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    h="full"
    {...rest}
  >
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
    {LinkItems.map((link) => (
      <NavItem key={link.name} icon={link.icon} route={link.route}>
        {link.name}
      </NavItem>
    ))}
  </Box>
);

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  route:string;
}
const NavItem = ({
  icon, route, children, ...rest
}: NavItemProps) => (
  <Link to={route}>
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
      <Icon
        mr="4"
        fontSize="16"
        _groupHover={{
          color: 'white',
        }}
        as={icon}
      />
      )}
      {children}
    </Flex>
  </Link>
);

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => (
  <Flex
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 4 }}
    height="20"
    alignItems="center"
    bg={useColorModeValue('white', 'gray.900')}
    borderBottomWidth="1px"
    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    justifyContent={{ base: 'space-between', md: 'flex-end' }}
    {...rest}
  >
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      onClick={onOpen}
      variant="outline"
      aria-label="open menu"
      icon={<FiMenu />}
    />

    <Text
      display={{ base: 'flex', md: 'none' }}
      fontSize="2xl"
      fontFamily="monospace"
      fontWeight="bold"
    >
      Logo
    </Text>

    <HStack spacing={{ base: '0', md: '6' }}>
      <Stack direction="row" spacing={6}>
        <SocialButton label="Forum" href="#">
          <FaDiscourse />
        </SocialButton>
        <SocialButton label="Wiki" href="#">
          <FaWikipediaW />
        </SocialButton>
        <SocialButton label="Youtube" href="#">
          <FaYoutube />
        </SocialButton>
        <SocialButton label="Twitter" href="#">
          <FaTwitter />
        </SocialButton>
        <SocialButton label="Facebook" href="#">
          <FaFacebook />
        </SocialButton>
      </Stack>
    </HStack>
  </Flex>
);
