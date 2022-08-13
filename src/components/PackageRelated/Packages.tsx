import {
  Box,
  Center,
  Button,
  SimpleGrid,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import {
  useRecoilState,
} from 'recoil';
import {
  packageState,
  Category,
  Package,
} from '../../stores/PackageStore';
import PackageDetail from './PackageDetail';

interface PackageProps {
}

const PackagesList: React.FC<PackageProps> = (props) => {
  const [packageSt, setPackageSt] = useRecoilState(packageState);

  useEffect(() => {
    /* const updatePkStatus = async () => {

      let pkData = Array.from(packageSt.values()).map((category:Category) => {
        Array.from(category.packages.values()).map((app:Package) => {

        });
      });
    }; */
  });
  const Apps = Array.from(packageSt.values()).map((category:Category) => (
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
          {Array.from(category.packages.values()).map((app:Package) => (
            <PackageDetail
              title={app.name}
              pkg={app.pkg}
              key={app.id}
              uniqueId={app.id}
              isInstalled={app.isInstalled}
              catId={category.id}
              installedVersion={app.installedVersion}
              icon={app.icon}
            >
              {app.description}
            </PackageDetail>
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
      {Apps}

      <Center>
        <a href="https://software.manjaro.org/applications" target="_blank" rel="noreferrer">
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
