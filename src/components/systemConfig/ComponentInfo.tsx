import {
  Card,
  Box,
  Flex,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import React, { ReactNode, useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { CiTempHigh } from 'react-icons/ci';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { random } from 'lodash';
import ArrowComponent from '../packageRelated/ArrowComponent';

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
const StatsCard = (props: StatsCardProps) => {
  const { title, stat, icon } = props;
  return (
    <Card px={{ base: 2, md: 4 }} py="3" size="xs">
      <Flex justifyContent="space-between">
        <Box px={{ base: 2, md: 4 }}>
          <Text noOfLines={1} fontSize="xs" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="xs" fontWeight="small">
            {stat}
          </Text>
        </Box>
        <Box
          my="auto"
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent="center"
        >
          {icon}
        </Box>
      </Flex>
    </Card>
  );
};
const ComponentInfo: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [componentInfo, setComponentInfo] = useState([
    {
      temperature: 0,
      max: 0,
      critical: 0,
      label: '',
    },
  ]);
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'free',
    loop: false,
    rubberband: true,
    slides: {
      origin: 'auto',
      perView: 1,
      spacing: 5,
    },
    created() {
      setLoaded(true);
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });
  useEffect(() => {
    invoke('get_component_info').then((response) => {
      const responseJson = JSON.parse(JSON.parse(JSON.stringify(response)));
      setComponentInfo(responseJson);
    });
  }, []);
  return (
    <Box position="relative">
      <div ref={sliderRef} className="keen-slider">
        {componentInfo.map((component) => (
          <div className={`keen-slider__slide ${random}`}>
            <StatsCard
              title={component.label}
              stat={`${`${component.temperature}°C`}`}
              icon={<CiTempHigh />}
            />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && componentInfo.length > 3 && (
        <>
          {currentSlide !== 0 && (
            <ArrowComponent
              left
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            />
          )}

          {currentSlide !== componentInfo.length - 2 && (
            <ArrowComponent
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default ComponentInfo;
