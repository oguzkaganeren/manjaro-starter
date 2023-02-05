import React from 'react';
import {
  Stack, Box, Flex, Icon, Spacer, Link, Spinner,
} from '@chakra-ui/react';
import { StickyBoundary, StickyViewport } from '@anubra266/stickyreact';
import { FiPackage } from 'react-icons/fi';
import { Command, open } from '@tauri-apps/api/shell';
import { FaDiscourse, FaWikipediaW } from 'react-icons/fa';
import { SiPagekit } from 'react-icons/si';
import { FcDocument } from 'react-icons/fc';
import { SearchManjaro, SearchResult } from './SearchManjaro';
import handleSearch from './HandleSearch';
import commands from '../../../assets/Commands';

const Res = (props: SearchResult) => {
  const {
    description, is_doc, title, type, url,
  } = props;
  const getIcon = () => {
    switch (type) {
      case 'package':
        return <FiPackage size="lg" />;
      case 'forum':
        return <FaDiscourse size="lg" />;
      case 'wiki':
        return <FaWikipediaW size="lg" />;
      case 'page':
        return <SiPagekit size="lg" />;

      default:
        return null;
    }
  };
  return (
    <Stack spacing={3} mt={3}>
      <Link
        onClick={async () => {
          if (type === 'package') {
            const cmd = new Command(commands.getPamacManager.program, [`--details=${props.package}`]);
            cmd.execute();
          } else if (url) {
            await open(url);
          }
        }}
      >
        <Flex
          as="a"
          role="group"
          px={4}
          py={3}
          mr={2}
          rounded="lg"
          cursor="pointer"
          transition="all 0.3s ease-in-out"
        >
          <Icon boxSize={8} my="auto">
            {getIcon()}
          </Icon>
          <Stack dir="row" spacing={0} ml={5}>
            <Box fontWeight="bold" textTransform="capitalize" fontSize="sm">
              {title}
            </Box>
            <Box textTransform="capitalize">{description}</Box>
          </Stack>
          <Spacer />
          {is_doc && (
            <Icon boxSize={5} my="auto">
              <FcDocument size="xs" />
            </Icon>
          )}
        </Flex>
      </Link>
    </Stack>
  );
};
interface SearchResProps {
  searchText: string;
  isForPackage:boolean;
}
const SearchResults = (props: SearchResProps) => {
  const { searchText, isForPackage } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiResponse, setApiResponse] = React.useState({} as SearchManjaro);
  React.useEffect(() => {
    const setSearch = async () => {
      setIsLoading(true);
      const res = await handleSearch(searchText, isForPackage);
      setApiResponse(res);
      setIsLoading(false);
    };
    if (searchText) {
      setSearch();
    }
  }, [searchText, isForPackage]);
  return (
    <StickyViewport as={Stack} mt={7} dir="row" maxH="md" overflowY="auto">
      {isLoading ? (<Spinner />) : apiResponse['search-results']?.map((res, cid) => (
        <StickyBoundary as={Stack} key={`api-result-${cid}`}>
          <Res
            description={res.description}
            is_doc={res.is_doc}
            package={res.package}
            title={res.title}
            type={res.type}
            url={res.url}
          />
        </StickyBoundary>
      ))}
    </StickyViewport>
  );
};

export default SearchResults;
