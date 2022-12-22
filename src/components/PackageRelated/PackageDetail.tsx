import React from 'react';
import {
  Box,
  Image,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Command } from '@tauri-apps/api/shell';
import PackageStatus from './PackageStatus';

  interface PackageDetailProps {
    icon:string;
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
    <Card minH="270" variant="filled">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Image
              boxSize="30px"
              src={`${process.env.PUBLIC_URL}/AppIcons/${icon}.svg`}
            />

            <Box>
              <Heading size="sm">
                <Button
                  variant="link"
                  whiteSpace="initial"
                  size="xs"
                  onClick={() => {
                    const cmd = new Command('pamac-manager', [
                      `--details=${pkg}`,
                    ]);
                    cmd.execute();
                  }}
                >
                  {title}
                </Button>
              </Heading>
              <Text fontSize="xs">{installedVersion}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{children}</Text>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <PackageStatus
          catId={catId}
          pkId={uniqueId}
          pkgName={pkg}
          isInstalled={isInstalled}
        />
      </CardFooter>
    </Card>
  );
};
export default PackageDetail;
