import { ReactElement } from 'react';
import {
  Text,
  Stack,
  Flex,
} from '@chakra-ui/react';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}
const FeatureComponent = ({ title, text, icon }: FeatureProps):JSX.Element => (
  <Stack>
    <Stack direction="row" align="center">
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="gray.100"
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
    </Stack>

    <Text color="gray.600" align="left">{text}</Text>
  </Stack>
);
export default FeatureComponent;
