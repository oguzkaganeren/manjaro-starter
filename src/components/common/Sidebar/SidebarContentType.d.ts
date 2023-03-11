import { As } from '@chakra-ui/react';

export type SidebarContentType = {
  icon: As<any>;
  text: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  isHidden?:boolean;
  isSelected?:boolean;
};
