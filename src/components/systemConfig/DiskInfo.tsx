import {
  Card,
  Box,
  Flex,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import React, { ReactNode, useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { FiDisc } from 'react-icons/fi';
import { FaUsb } from 'react-icons/fa';
import formatBytes from '../../utils/Format';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import ArrowComponent from '../packageRelated/ArrowComponent';
import { random } from 'lodash';

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
          <Text fontSize="xs" fontWeight="bold">
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
const DiskInfo: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [diskInfo, setDiskInfo] = useState([
    {
      DiskKind: '',
      name: '',
      file_system: {},
      mount_point: '',
      total_space: 0,
      available_space: 0,
      is_removable: '',
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
    invoke('get_disk_info').then((response) => {
      const responseJson = JSON.parse(JSON.parse(JSON.stringify(response)));
      setDiskInfo(responseJson);
    });
  }, []);
  return (
    <Box position="relative">
      <div ref={sliderRef} className="keen-slider">
        {diskInfo.map((disk) => (
          <div className={`keen-slider__slide ${random}`}>
            <StatsCard
              title={disk.name}
              stat={`${disk.DiskKind}(${formatBytes(
                disk.total_space,
              )}/${formatBytes(disk.available_space)})`}
              icon={
                disk.is_removable ? <FaUsb size="1em" /> : <FiDisc size="1em" />
              }
            />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && diskInfo.length > 2 && (
        <>
          {currentSlide !== 0 && (
            <ArrowComponent
              left
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            />
          )}

          {currentSlide !== diskInfo.length - 3 && (
            <ArrowComponent
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default DiskInfo;
