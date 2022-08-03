import React from 'react';
import {
  Box,
  Link,
  Icon,
  Button,
  SimpleGrid,
  useColorModeValue,
  chakra,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import PackageStatus from './PackageStatus';

  interface PackageDetailProps {
    icon:any;
    title:string;
    catId:string;
    uniqueId:string;
    pkg:string;
    isInstalled:boolean;
    pkStatusLoading:boolean;
  }

const PackageDetail: React.FC<PackageDetailProps> = (props) => {
  const {
    icon, title, catId, uniqueId, pkg, isInstalled, pkStatusLoading, children,
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
        <Icon
          boxSize={5}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          {icon}
        </Icon>
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
    </Box>
  );
};
export default PackageDetail;
