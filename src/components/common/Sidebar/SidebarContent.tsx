import {
  Flex,
  Box,
  BoxProps,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import NavItem from './NavItem';
import { SidebarContentType } from './SidebarContentType';

type Props = {
    sidebarContent:Array<SidebarContentType>
    otherProps:BoxProps
};

const SidebarContent = ({ sidebarContent, otherProps }:Props) => {
  const { t } = useTranslation();
  return (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      color="inherit"
      w="auto"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >

        {sidebarContent.map((content) => {
          if (!content.isHidden) {
            return (
              <NavItem
                icon={content.icon}
                onClick={content.onClick}
                isSelected={content.isSelected}
              >
                {t(content.text)}
              </NavItem>
            );
          } return <div />;
        })}
      </Flex>
    </Box>
  );
};
export default SidebarContent;
