import { Badge, Box, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { liveState } from '../../../stores/LiveStore';
import useEnvHook from './useEnvHook';

const EnvironmentStatusComponent = () => {
  const { t } = useTranslation();
  const isLive = useRecoilValue(liveState);
  const isOnline = useEnvHook();
  return (
    <Box position="absolute" ml={3} fontSize="xs" mt={2} color="gray.500">
      {isLive && (
        <Tooltip label={t('liveTooltip')}>
          <Badge ml="1" size="sm" colorScheme="purple">
            {t('live')}
          </Badge>
        </Tooltip>
      )}
      {!isOnline && (
        <Tooltip label={t('offlineTooltip')}>
          <Badge ml="1" size="sm" colorScheme="red">
            {t('offline')}
          </Badge>
        </Tooltip>
      )}
    </Box>
  );
};

export default EnvironmentStatusComponent;
