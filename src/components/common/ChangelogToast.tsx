import { useEffect } from 'react';
import store from 'store/storages/localStorage';
import {
  Box,
  useToast,
  Button,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import { open } from '@tauri-apps/api/shell';
import packageJson from '../../../package.json';
import notes from '../../CHANGELOG.md';

const newTheme = {
  a: (props: any) => {
    const { children, href } = props;

    return (
      <Button
        variant="link"
        whiteSpace="initial"
        size="sm"
        color={useColorModeValue('#fff', '#181F2E')}
        onClick={async () => {
          await open(href);
        }}
      >
        <Text as="u">{children}</Text>
      </Button>
    );
  },
  h3: (props: any) => {
    const { children } = props;
    return (
      <Heading as="h6" size="xs">
        {children}
      </Heading>
    );
  },
  h2: (props: any) => {
    const { children } = props;
    return (
      <Heading as="h5" size="xs">
        {children}
      </Heading>
    );
  },
  h1: (props: any) => {
    const { children } = props;
    return (
      <Heading as="h4" size="xs">
        {children}
      </Heading>
    );
  },
};
const ChangelogToast = (): JSX.Element => {
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    fetch(notes)
      .then((response) => response.text())
      .then((text) => {
        const val = store.read('version');
        if (!val || (val && val !== packageJson.version)) {
          toast({
            title: t('appChangelog'),
            status: 'info',
            position: 'bottom-left',
            duration: 20000,
            description: (
              <Box maxH="xs" fontSize="sm" maxWidth="xs" overflow="scroll">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={ChakraUIRenderer(newTheme)}
                >
                  {text}
                </ReactMarkdown>
              </Box>
            ),
            isClosable: true,
          });
          store.write('version', packageJson.version);
        }
      });
  }, []);
  return (<Box />);
};

export default ChangelogToast;
