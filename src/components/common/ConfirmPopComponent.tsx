import React from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  useDisclosure,
  Code,
  VStack,
  Spacer,
  Portal,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

type Props = {
  isButtonDisabled: boolean;
  confirmationDesc: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  commands?: Array<string>;
  portalEnabled?: boolean;
};

const ConfirmPopComponent = ({
  isButtonDisabled,
  confirmationDesc,
  handleClick,
  children,
  commands,
  portalEnabled,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { t } = useTranslation();
  const popContent = (
    <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
      <PopoverHeader pt={4} fontWeight="bold" border="0">
        {t('confirmation')}
      </PopoverHeader>
      <PopoverArrow />
      <PopoverCloseButton />

      <PopoverBody>
        {t(confirmationDesc)}
        <Spacer />
        {t('belowCommandsRun')}
        <VStack alignItems="flex-start" mt={1} mx={0}>
          {commands && commands.map((cmd) => <Code maxW={300}>{cmd}</Code>)}
        </VStack>
      </PopoverBody>
      <PopoverFooter display="flex" border="0" pb={4} justifyContent="flex-end">
        <ButtonGroup size="sm">
          <Button variant="outline" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button
            colorScheme="orange"
            isDisabled={isButtonDisabled}
            onClick={(event) => {
              handleClick(event);
              onClose();
            }}
          >
            {t('apply')}
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </PopoverContent>
  );
  const popContentWithPortal = <Portal>{popContent}</Portal>;
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="top">
      <PopoverTrigger>{children}</PopoverTrigger>
      {portalEnabled ? popContentWithPortal : popContent}
    </Popover>
  );
};

ConfirmPopComponent.defaultProps = {
  children: undefined,
  commands: undefined,
  portalEnabled: false,
};
export default ConfirmPopComponent;
