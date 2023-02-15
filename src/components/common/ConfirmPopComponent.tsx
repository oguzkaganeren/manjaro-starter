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
  commands?:Array<string>;
};

const ConfirmPopComponent = ({
  isButtonDisabled,
  confirmationDesc,
  handleClick,
  children,
  commands,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { t } = useTranslation();
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="top">
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent
          color="white"
          bg="blue.800"
          borderColor="blue.800"
        >
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
              {commands && commands.map((cmd) => <Code>{cmd}</Code>)}
            </VStack>
          </PopoverBody>
          <PopoverFooter
            display="flex"
            border="0"
            pb={4}
            justifyContent="flex-end"
          >
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
      </Portal>
    </Popover>
  );
};

ConfirmPopComponent.defaultProps = {
  children: undefined,
  commands: undefined,
};
export default ConfirmPopComponent;
