import {
  Container, Heading, Text, Tooltip, IconButton, Spacer,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons';

import { GiReturnArrow } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';
import SearchComponent from '../components/common/search/SearchComponent';
import SocialButtons from '../components/final/SocialButtons';

interface FinalProps {
    onReset: () => void;
}
const FinalScreen: React.FC<FinalProps> = (props) => {
  const { t } = useTranslation();
  const { onReset } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container textAlign="center">
      <CheckCircleIcon boxSize="50px" color="green.500" marginTop={100} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {t('congratulations')}
      </Heading>
      <Text color="gray.500">{t('readyText')}</Text>
      <Spacer mt={5} />
      <SearchComponent isForPackage={false} />
      <SocialButtons />

      <Tooltip label={t('returnFirstStep')}>
        <IconButton
          boxSize="50px"
          color="green.500"
          position="fixed"
          bottom={5}
          aria-label={t('returnFirstStep')}
          left={5}
          onClick={() => onReset()}
          icon={<GiReturnArrow />}
        />
      </Tooltip>
    </Container>
  );
};
export default FinalScreen;
