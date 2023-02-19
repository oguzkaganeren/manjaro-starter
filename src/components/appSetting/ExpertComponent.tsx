import {
  HStack,
  Spacer,
  FormControl,
  Tooltip,
  Switch,
  Badge,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import expertState from '../../stores/ExpertStore';
import DotComponent from '../common/DotComponent';

const ExpertComponent: React.FC = () => {
  const { t } = useTranslation();
  const [expert, setExpert] = useRecoilState(expertState);
  return (
    <FormControl
      py={4}
      px={8}
      mt={4}
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      shadow="lg"
      rounded="lg"
    >
      <HStack>
        <DotComponent color="orange.300">
          <span>{t('expertMode')}</span>
        </DotComponent>

        <Tooltip label={t('expertModeDesc')}>
          <Badge variant="ghost">
            <FaRegQuestionCircle />
          </Badge>
        </Tooltip>
        <Spacer />
        <Switch
          isChecked={expert}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setExpert(event.target.checked);
          }}
          id="expert"
        />
      </HStack>
    </FormControl>
  );
};
export default ExpertComponent;
