import React from 'react';
import {
  Stack, Box, Flex, Icon, Spacer, Link, Spinner,
} from '@chakra-ui/react';
import { StickyBoundary, StickyViewport } from '@anubra266/stickyreact';
import { FiPackage } from 'react-icons/fi';
import { Command } from '@tauri-apps/api/shell';
import { SearchManjaro, SearchResult } from './SearchManjaro';
import handleSearch from './HandleSearch';

const Res = (props: SearchResult) => {
  const {
    description, isDoc, title, type, url,
  } = props;
  return (
    <Stack spacing={3} mt={3}>
      <Link
        onClick={() => {
          const cmd = new Command('pamac-manager', [`--details=${props.package}`]);
          cmd.execute();
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
            <FiPackage size="lg" />
          </Icon>
          <Stack dir="row" spacing={0} ml={5}>
            <Box fontWeight="bold" textTransform="capitalize" fontSize="sm">
              {title}
            </Box>
            <Box textTransform="capitalize">{description}</Box>
          </Stack>
          <Spacer />
        </Flex>
      </Link>
    </Stack>
  );
};
interface SearchResProps {
  searchText: string;
}
const SearchResults = (props: SearchResProps) => {
  const { searchText } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiResponse, setApiResponse] = React.useState({} as SearchManjaro);
  React.useEffect(() => {
    const setSearch = async () => {
      setIsLoading(true);
      const res = await handleSearch(searchText);
      setApiResponse(res);
      setIsLoading(false);
    };
    if (searchText) {
      setSearch();
    }
  }, [searchText]);
  return (
    <StickyViewport as={Stack} mt={7} dir="row" maxH="md" overflowY="auto">
      {isLoading ? (<Spinner />) : apiResponse['search-results']?.map((res, cid) => (
        <StickyBoundary as={Stack} key={`api-result-${cid}`}>
          <Res
            description={res.description}
            isDoc={res.isDoc}
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
