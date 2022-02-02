import {
  Box,
  useColorModeValue,
  Button,
  Center,
  Text,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import {
  SiDiscourse, SiWikipedia, SiGit,
} from 'react-icons/si';
import { FiPackage, FiMail } from 'react-icons/fi';
import { BiDonateHeart } from 'react-icons/bi';

interface MoreComponentProps {
  }

const MoreComponent: React.FC<MoreComponentProps> = (props) => (
  <Box
    px={8}
    py={20}
    mx="auto"
    bg={useColorModeValue('white', 'gray.800')}
    shadow="xl"
    textAlign={{ lg: 'left' }}
  >
    <Wrap>
      <Button colorScheme="whatsapp" leftIcon={<SiDiscourse />}>
        <Center>
          <Text>Post to Forum</Text>
        </Center>
      </Button>
      <Button mt={5} colorScheme="yellow" leftIcon={<FiPackage />}>
        <Center>
          <Text>Discover Software</Text>
        </Center>
      </Button>
      <Button mt={5} colorScheme="orange" leftIcon={<SiWikipedia />}>
        <Center>
          <Text>Read Docs</Text>
        </Center>
      </Button>
      <Button mt={5} colorScheme="teal" leftIcon={<SiGit />}>
        <Center>
          <Text>Contribute</Text>
        </Center>
      </Button>
      <Button mt={5} colorScheme="cyan" leftIcon={<FiMail />}>
        <Center>
          <Text>Join Mailing List</Text>
        </Center>
      </Button>
      <Button mt={5} colorScheme="green" leftIcon={<BiDonateHeart />}>
        <Center>
          <Text>Donate</Text>
        </Center>
      </Button>
    </Wrap>

  </Box>
);
export default MoreComponent;
