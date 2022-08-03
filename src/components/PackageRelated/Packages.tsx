import {
  Box,
  Center,
  Icon,
  Button,
  SimpleGrid,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import {
  useRecoilState,
} from 'recoil';
import _ from 'lodash';
import { Command } from '@tauri-apps/api/shell';
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
  const [pkStatusLoading, setPkStatusLoading] = useState(false);

  useEffect(() => {
    const getAllPackageStatus = async () => {
      const temp = _.cloneDeep(packageSt);
      await Promise.all(temp.map(async (cat) => {
        await Promise.all(cat.packages.map(async (pk) => {
          const cmd = new Command('installed-control', [pk.pkg]);
          const cmdResult = await cmd.execute();
          if (cmdResult.stdout) {
            pk.isInstalled = true;
            const cmdVersion = new Command('version-control', ['-Qe', pk.pkg]);
            const cmdVersionResult = await cmdVersion.execute();
            if (cmdVersionResult.stdout) {
              const spStd = cmdVersionResult.stdout.split(' ')[1];
              pk.installedVersion = spStd;
            }
          }
        }));
      }));
      setPackageSt(temp);
      setPkStatusLoading(true);
    };
    setTimeout(getAllPackageStatus,
      1000);
  }, []);

  const Apps = packageSt.map((category:Category) => (
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
          {category.packages.map((app:Package) => (
            <PackageDetail
              title={app.name}
              pkg={app.pkg}
              key={app.id}
              uniqueId={app.id}
              isInstalled={app.isInstalled}
              catId={category.id}
              pkStatusLoading={pkStatusLoading}
              installedVersion={app.installedVersion}
              icon={(
                <path
                  fillRule="evenodd"
                  d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                  clipRule="evenodd"
                />

          )}
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
