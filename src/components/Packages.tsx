import {
  Box,
  CircularProgress,
  Icon,
  Text,
  SimpleGrid,
  useColorModeValue,
  chakra,
  Spacer,
  HStack,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { RiInstallLine, RiCheckLine } from 'react-icons/ri';
import {
  useRecoilState, useRecoilCallback, useRecoilValue,
} from 'recoil';
import {
  Category, getPackages, getPackageStatus, installPackage, packageState,
} from '../stores/PackageStore';

interface PackageProps {
}

const PackagesList: React.FC<PackageProps> = (props) => {
  const [packageSt, setPackageSt] = useRecoilState(packageState);
  const toast = useToast();
  function InstallPackage(pkgName: string) {
    const packageInstallStatus = useRecoilValue(installPackage(pkgName));
    return (
      <div>
        <React.Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}>
          <Text>test</Text>
        </React.Suspense>
      </div>
    );
  }
  const installPackageWithName = useRecoilCallback(({ snapshot }) => async (pkgName:string) => {
    const result:string = await snapshot.getPromise(installPackage(pkgName));

    const desc = result.replaceAll('"', '').replaceAll('\\u{a0}', ' ').split('\\n').map((item) => (
      <span>
        {item}
        <br />
      </span>
    ));
    toast({
      title: 'Installing...',
      description: desc,
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });
  });
  function PackageInfo(pkgName: string) {
    const packageStatus = useRecoilValue(getPackageStatus(pkgName));
    return (
      <div>
        <React.Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}>
          {packageStatus === 'true' ? (
            <IconButton aria-label="installed" disabled icon={<RiCheckLine />} colorScheme="gray" variant="solid" />
          ) : (
            <IconButton aria-label="install" icon={<RiInstallLine />} onClick={() => installPackageWithName(pkgName)} colorScheme="green" variant="solid" />
          )}
        </React.Suspense>

      </div>
    );
  }
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
        {PackageInfo(props.pkg)}

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
    <Box mt={8}>
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
    </Box>
  );
};
export default PackagesList;
