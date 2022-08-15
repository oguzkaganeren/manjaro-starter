import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Stat,
  Flex,
  Box,
  StatLabel,
  Image,
  Center,
  Text,
  useColorModeValue,
  Wrap,
  StatNumber,
} from '@chakra-ui/react';
import {
  SiGit,
} from 'react-icons/si';
import { GrLicense } from 'react-icons/gr';
import { open } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import logo from '../assets/icon.png';
import packageJson from '../../package.json';

type AboutButtonsProps = {
};

const AboutComponent = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  return (
    <>
      <Button w="full" onClick={onOpen}>About</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stat
              px={{ base: 2, md: 4 }}
              py="5"
              shadow="xl"
              border="1px solid"
              borderColor={useColorModeValue('gray.800', 'gray.500')}
              rounded="lg"
            >
              <Flex justifyContent="space-between">
                <Box pl={{ base: 2, md: 4 }}>
                  <StatLabel fontWeight="medium">
                    {t('manjaroStarter')}
                  </StatLabel>
                  <StatNumber fontSize="2xl" fontWeight="medium">
                    {packageJson.version}
                  </StatNumber>

                </Box>
                <Box
                  my="auto"
                  color={useColorModeValue('gray.800', 'gray.200')}
                  alignContent="center"
                >
                  <Image
                    borderRadius="full"
                    boxSize="45px"
                    src={logo}
                  />
                </Box>
              </Flex>
            </Stat>
          </ModalBody>

          <ModalFooter>
            <Wrap>
              <Button mt={5} mr={5} onClick={async () => { await open('https://github.com/oguzkaganeren/manjaro-starter'); }} leftIcon={<SiGit />}>
                <Center>
                  <Text>{t('projectGithubPage')}</Text>
                </Center>
              </Button>
              <Button mt={5} mr={5} onClick={async () => { await open('https://github.com/oguzkaganeren/manjaro-starter/blob/master/LICENSE.md'); }} leftIcon={<GrLicense />}>
                <Center>
                  <Text>{t('gnu')}</Text>
                </Center>
              </Button>
            </Wrap>

          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  );
};

export default AboutComponent;
