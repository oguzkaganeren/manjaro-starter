import { CloseIcon } from '@chakra-ui/icons';
import React from 'react';
import {
  Box,
  Flex,
  Spinner,
  Icon,
  chakra,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

type Props = {
  title: string;
  desc: string;
  icon:IconType;
  isProcessing:boolean;
};

const ProcessSingle = ({
  title, desc, icon, isProcessing,
}:Props) => (
  <Flex
    maxW="sm"
    w="full"
    mx="auto"
    bg="white"
    _dark={{
      bg: 'gray.800',
    }}
    rounded="lg"
    overflow="hidden"
  >
    <Flex justifyContent="center" alignItems="center" w={12} bg="green.500">
      {!isProcessing && <Icon as={icon} color="white" boxSize={6} />}
      {isProcessing && <Spinner />}
    </Flex>

    <Box mx={-3} py={2} px={4}>
      <Box mx={3}>
        <chakra.span
          color="green.500"
          _dark={{
            color: 'green.400',
          }}
          fontWeight="bold"
        >
          {title}
        </chakra.span>
        <chakra.p
          color="gray.600"
          _dark={{
            color: 'gray.200',
          }}
          fontSize="sm"
        >
          {desc}
        </chakra.p>
      </Box>
    </Box>
    <Spacer />
    <Flex
      justifyContent="center"
      alignItems="center"
      w={12}
      bg="gray.400"
      _dark={{
        bg: 'gray.700',
      }}
    >
      <IconButton
        aria-label="cancel"
        onClick={async () => {
        }}
        bg="gray.400"
        _dark={{
          bg: 'gray.700',
        }}
        size="sm"
        icon={<CloseIcon />}
      />
    </Flex>
  </Flex>
);
export default ProcessSingle;
