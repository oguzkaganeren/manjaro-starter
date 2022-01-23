import { ReactElement } from 'react';
import {
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Divider,
} from '@chakra-ui/react';
import {
  FcElectronics, FcInfo, FcGlobe, FcCollaboration, FcFeedback, FcInvite,
} from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}
const Feature = ({ title, text, icon }: FeatureProps) => (
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

export default function HomeContent() {
  return (
    <Flex p={4} marginTop={90}>
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

        <Divider orientation="horizontal" />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Feature
            icon={<Icon as={FcElectronics} w={10} h={10} />}
            title="Handling hardware"
            text="Manjaro not only supports the use of multiple kernels (selectable from the advanced options at the boot screen), but also provides access to the very latest bleeding-edge kernels as well. This can be done through the use of the Kernel module in Manjaro's graphical Settings Manager, or via the command line using the MHWD-kernel (Manjaro Hardware Detection) command.
                      "
          />
          <Feature
            icon={<Icon as={FcInfo} w={10} h={10} />}
            title="Getting help"
            text="Although Manjaro is designed to work as much out of the box as possible, we don't claim it's perfect. There can be times when things go wrong, you might have questions and a desire to learn more, or just want to personalize it to suit your tastes. This page provides details of some available resources to help you!
            "
          />
          <Feature
            icon={<Icon as={FcGlobe} w={10} h={10} />}
            title="Search the web"
            text="Perhaps the first place to look for generic Linux help is by using your favorite search engine. Just include words like 'Linux', 'Manjaro' or 'Arch' in your search query. As Manjaro is based on Arch Linux, guides and tips designed for Arch usually apply to Manjaro too."
          />
          <Feature
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            title="Look in the forums"
            text="For specific help with Manjaro we have a dedicated online forum where you can search for topics, or create one yourself! This is probably the next best place to go for collaboration, discussion and assistance. Ask for help, post your thoughts, or outline some suggestions. Don't be shy!

            The Manjaro forum is divided into sub-forums for different topics and environments, please post your query "
          />
          <Feature
            icon={<Icon as={FcInvite} w={10} h={10} />}
            title="Sign up to a mailing list"
            text="Perhaps the first place to look for generic Linux help is by using your favorite search engine. Just include words like 'Linux', 'Manjaro' or 'Arch' in your search query. As Manjaro is based on Arch Linux, guides and tips designed for Arch usually apply to Manjaro too."
          />
          <Feature
            icon={<Icon as={FcFeedback} w={10} h={10} />}
            title="Suggestions"
            text="Got a suggestion on how we can make Manjaro better? Found something you want to be included, or want to help out? Please let us know, by posting your suggestion on the forum.

            Thank you!"
          />
        </SimpleGrid>
      </Stack>

    </Flex>
  );
}
