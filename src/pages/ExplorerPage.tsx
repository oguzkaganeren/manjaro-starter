import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

interface ExplorerPageProps {
    }

const ExplorerPage: React.FC<ExplorerPageProps> = () => (
  <Box
    px={8}
    py={20}
    mx="auto"
    bg={useColorModeValue('white', 'gray.800')}
    shadow="xl"
  />
);
export default ExplorerPage;
