import {
  As,
  Flex,
  Icon,
} from '@chakra-ui/react';

type Props = {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    children?: React.ReactNode;
    icon:As<any>;
    isSelected?:boolean;
};

const NavItem = (props:Props) => {
  const {
    icon, children, onClick, isSelected,
  } = props;
  const selectedStyle = {
    bg: 'green.600',
    _dark: {
      bg: 'green.500',
    },
    color: 'white',
  };
  return (
    <Flex
      align="center"
      px="4"
      mx="2"
      rounded="md"
      py="3"
      cursor="pointer"
      color="inherit"
      _hover={{
        bg: 'gray.100',
        _dark: {
          bg: 'gray.900',
          color: 'white',
        },
        color: 'gray.900',
      }}
      _dark={{
        color: 'gray.400',
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(isSelected && selectedStyle)}
    >
      {icon && (
      <Icon
        mx="2"
        boxSize="4"
        as={icon}
      />
      )}
      {children}
    </Flex>
  );
};
NavItem.defaultProps = {
  children: undefined,
  onClick: undefined,
  isSelected: false,
};
export default NavItem;
