import React from 'react';
import {
  Box,
  Text,
  Image,
  Button,
  Badge,
  useColorModeValue,
  chakra,
  Spacer,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { Command } from '@tauri-apps/api/shell';
import PackageStatus from './PackageStatus';

  interface PackageDetailProps {
    icon:any;
    title:string;
    catId:string;
    uniqueId:string;
    pkg:string;
    isInstalled:boolean;
    installedVersion:string;
    children: React.ReactNode;
  }

const PackageDetail: React.FC<PackageDetailProps> = (props) => {
  const {
    icon, title, catId, uniqueId, pkg, isInstalled, installedVersion, children,
  } = props;
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      flex="1"
      borderRadius="md"
    >

      <HStack spacing={3}>
        <Image
          boxSize="30px"
          src={`${process.env.PUBLIC_URL}/AppIcons/${icon}.svg`}
        />
        <chakra.h3
          fontWeight="semibold"
          lineHeight="shorter"
        >
          <Button
            variant="link"
            whiteSpace="initial"
            onClick={() => {
              const cmd = new Command('pamac-manager', [`--details=${pkg}`]);
              cmd.execute();
            }}

          >
            {title}
          </Button>
        </chakra.h3>
        <Spacer />
        <PackageStatus
          catId={catId}
          pkId={uniqueId}
          pkgName={pkg}
          isInstalled={isInstalled}
        />

      </HStack>
      <chakra.p
        fontSize="sm"
        mt={6}
        color={useColorModeValue('gray.500', 'gray.400')}
      >
        {children}
      </chakra.p>
      <Stack mt={5} direction="row" alignItems="center" justifyContent="right">
        <Badge placeSelf="bottom-end" variant="outline" colorScheme="green">
          {installedVersion}
        </Badge>
      </Stack>

    </Box>
  );
};
export default PackageDetail;
