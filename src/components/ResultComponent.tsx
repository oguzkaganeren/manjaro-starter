import {
  Container, Heading, Text, Button, Center, Wrap,
} from '@chakra-ui/react';
import React from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  SiDiscourse, SiWikipedia, SiGit, SiTelegram, SiReddit,
} from 'react-icons/si';
import {
  FiPackage, FiMail, FiFacebook, FiTwitter,
} from 'react-icons/fi';
import { open } from '@tauri-apps/api/shell';
import { BiDonateHeart } from 'react-icons/bi';
import { urls } from '../assets/Preferences.json';

interface ResultProps {
    onReset: () => void;
}
const ResultComponent: React.FC<ResultProps> = (props) => (
  <Container textAlign="center">
    <CheckCircleIcon boxSize="50px" color="green.500" marginTop={150} />
    <Heading as="h2" size="xl" mt={6} mb={2}>
      Congratulations!
    </Heading>
    <Text color="gray.500">
      You are ready. Time to discover your special linux environment.
    </Text>
    <Button mt={5} mr={5} colorScheme="whatsapp" onClick={async () => { await open(urls.forum); }} leftIcon={<SiDiscourse />}>
      <Center>
        <Text>Post to Forum</Text>
      </Center>
    </Button>
    <Button mt={5} mr={5} colorScheme="yellow" onClick={async () => { await open(urls.software); }} leftIcon={<FiPackage />}>
      <Center>
        <Text>Discover Software</Text>
      </Center>
    </Button>
    <Button mt={5} mr={5} colorScheme="orange" onClick={async () => { await open(urls.wiki); }} leftIcon={<SiWikipedia />}>
      <Center>
        <Text>Read Wiki</Text>
      </Center>
    </Button>
    <Button mt={5} mr={5} colorScheme="teal" onClick={async () => { await open(urls.development); }} leftIcon={<SiGit />}>
      <Center>
        <Text>Contribute</Text>
      </Center>
    </Button>
    <Button mt={5} mr={5} colorScheme="telegram" onClick={async () => { await open(urls.telegram); }} leftIcon={<SiTelegram />}>
      <Center>
        <Text>Telegram</Text>
      </Center>
    </Button>
    <Button mt={5} mr={5} colorScheme="facebook" onClick={async () => { await open(urls.facebook); }} leftIcon={<FiFacebook />}>
      <Center>
        <Text>Facebook</Text>
      </Center>
    </Button>
    <Button mt={5} mr={5} colorScheme="twitter" onClick={async () => { await open(urls.twitter); }} leftIcon={<FiTwitter />}>
      <Center>
        <Text>Twitter</Text>
      </Center>
    </Button>
    <Button mt={5} mr={5} colorScheme="red" onClick={async () => { await open(urls.reddit); }} leftIcon={<SiReddit />}>
      <Center>
        <Text>Reddit</Text>
      </Center>
    </Button>
    <Button mt={5} mr={5} colorScheme="cyan" onClick={async () => { await open(urls.mailing); }} leftIcon={<FiMail />}>
      <Center>
        <Text>Join Mailing List</Text>
      </Center>
    </Button>
    <Button mt={5} mr={5} colorScheme="green" onClick={async () => { await open(urls.donate); }} leftIcon={<BiDonateHeart />}>
      <Center>
        <Text>Donate</Text>
      </Center>
    </Button>

    <Button mt={5} mr={5} onClick={() => props.onReset()}>
      Return First Step
    </Button>

  </Container>
);
export default ResultComponent;
