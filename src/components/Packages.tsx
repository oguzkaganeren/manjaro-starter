import {
  Box,
  Center,
  Icon,
  Button,
  SimpleGrid,
  useColorModeValue,
  chakra,
  Spacer,
  HStack,
  IconButton,
  useToast,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import React, { useState, useEffect, Suspense } from 'react';
import { RiInstallLine, RiCheckLine } from 'react-icons/ri';
import {
  useRecoilState, useRecoilCallback, useRecoilValue,
} from 'recoil';
import _ from 'lodash';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Category, getPackages, getPackageStatus, installPackage, packageState,
} from '../stores/PackageStore';

interface PackageProps {
}
interface PackageInfoProps {
  isInstalled:boolean,
  catId:string,
  pkId:string,
  pkgName:string,
}
interface ModalProps {
  dsc:JSX.Element[],
}

const PackageInfo: React.FC<PackageInfoProps> = (props) => {
  const toast = useToast();
  const packageStatusUpdate = useRecoilCallback(({ snapshot, set }) => async (
    catId:string,
    pkId:string,
  ) => {
    const packages = await snapshot.getPromise(packageState);
    const cats = _.cloneDeep(packages);
    const catIndex = cats.findIndex((element) => element.id === catId);
    const pkIndex = cats[catIndex].packages.findIndex((element) => element.id === pkId);
    const updatedPk = cats[catIndex].packages[pkIndex];
    const packageStatus = await snapshot.getPromise(getPackageStatus(updatedPk.pkg));
    updatedPk.isInstalled = packageStatus === 'true';
    set(packageState, (prev) => prev.map((item, index) => {
      if (index !== catIndex) {
        return item;
      }
      return {
        ...item,
        packages: item.packages.map((pk, index2) => (pkIndex !== index2 ? pk : updatedPk)),
      };
    }));
  }, []);
  const BasicUsage : React.FunctionComponent<ModalProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <Box>
        <Button onClick={onOpen} size="sm" mt={5} colorScheme="whatsapp" variant="solid">Details</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {props.dsc}
            </ModalBody>

          </ModalContent>
        </Modal>
      </Box>
    );
  };
  const installPackageWithName = useRecoilCallback(({ snapshot }) => async (
    catId:string,
    pkId:string,
    pkgName:string,
  ) => {
    const result:string = await snapshot.getPromise(installPackage(pkgName));

    const desc = result.replaceAll('"', '').replaceAll('\\u{a0}', ' ').split('\\n').map((item, index) => (
      <span>
        {item}
        <br />
      </span>
    ));
    const colDesc = (
      <>
        <Text noOfLines={[1, 2, 3]}>
          {desc}
        </Text>
        <BasicUsage dsc={desc} />
      </>
    );
    packageStatusUpdate(catId, pkId);
    if (result.toUpperCase().includes('ERROR')) {
      toast({
        title: `Installing ${pkgName}`,
        description: desc,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    } else {
      toast({
        title: `Installing ${pkgName}`,
        description: colDesc,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  });
  const {
    isInstalled, catId, pkId, pkgName,
  } = props;
  return (
    <div>
      {isInstalled ? (
        <IconButton aria-label="installed" disabled icon={<RiCheckLine />} colorScheme="gray" variant="solid" />
      ) : (
        <IconButton aria-label="install" icon={<RiInstallLine />} onClick={() => installPackageWithName(catId, pkId, pkgName)} colorScheme="green" variant="solid" />
      )}
    </div>
  );
};

const PackagesList: React.FC<PackageProps> = (props) => {
  const [packageSt, setPackageSt] = useRecoilState(packageState);
  const [pkStatus, setPkStatus] = useState(false);

  useEffect(() => {
    const getAllPackageStatus = async () => {
      const temp = _.cloneDeep(packageSt);
      await Promise.all(temp.map(async (cat) => {
        await Promise.all(cat.packages.map(async (pk) => {
          const packageStatus = await invoke('run_shell_command', { command: `pacman -Qe ${pk.pkg}` });
          pk.isInstalled = packageStatus === 'true';
        }));
      }));
      setPackageSt(temp);
      setPkStatus(true);
    };
    setTimeout(getAllPackageStatus,
      1000);
  }, []);
  const Feature = (props:any) => (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
    >
      <HStack spacing={3}>
        <Icon
          boxSize={5}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          {props.icon}
        </Icon>
        <chakra.h3
          mb={2}
          fontWeight="semibold"
          lineHeight="shorter"
        >
          {props.title}
        </chakra.h3>
        <Spacer />
        {pkStatus ? (
          <PackageInfo
            catId={props.catId}
            pkId={props.uniqueId}
            pkgName={props.pkg}
            isInstalled={props.isInstalled}
          />
        ) : (
          <Button
            isLoading
            variant="outline"
          />
        )}

      </HStack>
      <chakra.p
        fontSize="sm"
        mt={6}
        color={useColorModeValue('gray.500', 'gray.400')}
      >
        {props.children}
      </chakra.p>

    </Box>
  );
  const Features = packageSt.map((category:any) => (
    <Box mt={8} key={category.id}>
      <Box textAlign={{ lg: 'left' }}>
        <chakra.p
          mt={2}
          fontSize={{ base: '3xl', sm: '4xl' }}
          lineHeight="8"
          fontWeight="extrabold"
          letterSpacing="tight"
          color={useColorModeValue('white.900', 'white.100')}
        >
          {category.name}
        </chakra.p>
        <chakra.p
          mt={4}
          maxW="2xl"
          fontSize="xl"
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {category.description}
        </chakra.p>
        <SimpleGrid
          columns={{
            base: 1, sm: 2, md: 3, lg: 4,
          }}
          spacingX={{ base: 16, lg: 24 }}
          spacingY={10}
          mt={6}
        >
          {category.packages.map((app:any) => (
            <Feature
              color="red"
              title={app.name}
              pkg={app.pkg}
              key={app.id}
              uniqueId={app.id}
              isInstalled={app.isInstalled}
              catId={category.id}
              icon={(
                <path
                  fillRule="evenodd"
                  d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                  clipRule="evenodd"
                />

          )}
            >
              {app.description}
            </Feature>
          ))}
        </SimpleGrid>
      </Box>

    </Box>
  ));
  return (
    <Box
      px={8}
      py={20}
      mx="auto"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="xl"
    >
      <Box textAlign={{ lg: 'center' }}>
        <chakra.p
          mt={2}
          fontSize={{ base: '3xl', sm: '4xl' }}
          lineHeight="8"
          fontWeight="extrabold"
          letterSpacing="tight"
          color={useColorModeValue('white.900', 'white.100')}
        >
          Packages
        </chakra.p>

        <chakra.p
          mt={4}
          maxW="2xl"
          fontSize="xl"
          mx={{ lg: 'auto' }}
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          Install packages to set up your environment.
        </chakra.p>
      </Box>
      {Features}
      <Center>
        <a href="https://discover.manjaro.org/applications" target="_blank" rel="noreferrer">
          <Button
            mt={10}
            size="md"
            height="48px"
            width="200px"
            border="2px"
            borderColor="green.500"
          >
            Discover More
          </Button>
        </a>
      </Center>
    </Box>
  );
};
export default PackagesList;
