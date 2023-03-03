import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Spinner,
  Icon,
  chakra,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import { SiProgress } from 'react-icons/si';

const ProcessSingle: React.FC = () => (
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
      <Icon as={SiProgress} color="white" boxSize={6} />
      <Spinner />
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
          Success
        </chakra.span>
        <chakra.p
          color="gray.600"
          _dark={{
            color: 'gray.200',
          }}
          fontSize="sm"
        >
          Your account was registered!
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
