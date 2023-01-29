import {
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';

const ArrowComponent = (props: {
  left?: boolean;
  onClick: (e: any) => void;
}) => {
  const { left, onClick } = props;
  const color = useColorModeValue('#181F2E', '#fff');
  return (
    <Icon
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      position="absolute"
      cursor="pointer"
      transform="translateY(-50%)"
      top="50%"
      style={left ? { left: 5 } : { right: 5 }}
    >
      {left && (
        <path
          fill={color}
          d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
        />
      )}
      {!left && (
        <path fill={color} d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </Icon>
  );
};
ArrowComponent.defaultProps = {
  left: false,
};
export default ArrowComponent;
