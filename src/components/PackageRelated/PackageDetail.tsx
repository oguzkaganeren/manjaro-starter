import React from 'react';
import {
  Box,
  Link,
  Image,
  Button,
  Badge,
  useColorModeValue,
  chakra,
  Spacer,
  HStack,
  Stack,
} from '@chakra-ui/react';
import PackageStatus from './PackageStatus';

  interface PackageDetailProps {
    icon:any;
    title:string;
    catId:string;
    uniqueId:string;
    pkg:string;
    isInstalled:boolean;
    pkStatusLoading:boolean;
    installedVersion:string;
  }

const PackageDetail: React.FC<PackageDetailProps> = (props) => {
  const {
    icon, title, catId, uniqueId, pkg, isInstalled, pkStatusLoading, installedVersion, children,
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
          alt="Dan Abramov"
        />
        <chakra.h3
          fontWeight="semibold"
          lineHeight="shorter"
        >
          <Link href={`https://software.manjaro.org/package/${pkg}`} isExternal>
            {title}
          </Link>
        </chakra.h3>
        <Spacer />
        {pkStatusLoading ? (
          <PackageStatus
            catId={catId}
            pkId={uniqueId}
            pkgName={pkg}
            isInstalled={isInstalled}
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
