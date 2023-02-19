import React from 'react';
import { chakra } from '@chakra-ui/react';

type Props = {
    color:string;
    children: React.ReactNode;
}

const DotComponent = (props: Props) => {
  const { color, children } = props;
  return (
    <chakra.span pos="relative" display="inline-block">
      {children}
      <chakra.span
        pos="absolute"
        top="-1px"
        right="-5px"
        p="4px"
        transform="translate(50%,-50%)"
        bg={color}
        rounded="full"
      />
    </chakra.span>
  );
};

export default DotComponent;
