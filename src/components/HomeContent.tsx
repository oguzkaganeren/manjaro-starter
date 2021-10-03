import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

// Replace test data with your own
// eslint-disable-next-line prefer-spread
const features = Array.apply(null, Array(8)).map((x, i) => ({
  id: i,
  title: 'Lorem ipsum dolor sit amet',
  text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
}));

export default function HomeContent() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW="3xl" textAlign="center">
        <Heading fontSize="3xl">
          Welcome to Manjaro!
        </Heading>
        <Text color="gray.600" fontSize="xl">
          We, the Manjaro Developers, hope that you will enjoy using Manjaro as
          much as we enjoy building it. Manjaro Hello will help you to get
          started with your new operating system. So enjoy the experience, and
          don&apos;t hesitate to send us your feedback.
        </Text>
      </Stack>

      <Container maxW="6xl" mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align="top">
              <Box color="green.400" px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align="start">
                <Text fontWeight={600}>
                  {feature.title}
                </Text>
                <Text color="gray.600">
                  {feature.text}
                </Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>

      </Container>
    </Box>
  );
}
