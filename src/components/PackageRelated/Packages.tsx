import {
  Box,
  chakra,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import './styles.css';
import {
  packageState,
  Category,
  Package,
} from '../../stores/PackageStore';
import PackageDetail from './PackageDetail';

const Arrow = (props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) => {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? 'arrow--left' : 'arrow--right'
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
};
const PackagesList: React.FC = () => {
  const packageSt = useRecoilValue(packageState);
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'free',
    loop: false,
    rubberband: false,
    slides: {
      origin: 'auto',
      perView: 2.2,
      spacing: 5,
    },
    created() {
      setLoaded(true);
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const Categories = (
    <TabList
      maxH={{
        sm: '10em',
        md: '24em',
        lg: '24em',
        xl: '20em',
        '2xl': '80em',
      }}
      overflow="scroll"
    >
      {Array.from(packageSt.values()).map((category: Category) => (
        <Tab>{category.name}</Tab>
      ))}
    </TabList>
  );
  const Apps = Array.from(packageSt.values()).map((category: Category) => (
    <TabPanel key={category.id}>
      <Box
        textAlign={{ lg: 'left' }}
        width="full"
        minW={{
          sm: '25em',
          md: '37em',
          lg: '50em',
          xl: '60em',
          '2xl': '80em',
        }}
        maxW={{
          sm: '25em',
          md: '37em',
          lg: '50em',
          xl: '60em',
          '2xl': '80em',
        }}
      >
        <chakra.p
          fontSize={{ base: '3xl', sm: '4xl' }}
          lineHeight="8"
          fontWeight="extrabold"
          letterSpacing="tight"
          id={category.name.replaceAll(' ', '-').replaceAll('/', '-')}
          color="white.900"
          _dark={{ color: 'white.100' }}
        >
          {category.name}
        </chakra.p>
        <chakra.p
          mt={4}
          maxW="2xl"
          fontSize="xl"
          color="gray.500"
          _dark={{ color: 'gray.400' }}
        >
          {category.description}
        </chakra.p>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider">
            {Array.from(category.packages.values()).map((app: Package) => (
              <div className={`keen-slider__slide ${category.name}`}>
                <PackageDetail
                  title={app.name}
                  pkg={app.pkg}
                  key={app.id}
                  uniqueId={app.id}
                  isInstalled={app.isInstalled}
                  catId={category.id}
                  installedVersion={app.installedVersion}
                  icon={app.icon}
                >
                  {app.description}
                </PackageDetail>
              </div>
            ))}
          </div>
          {loaded && instanceRef.current && category.packages.size > 2 && (
            <>
              <Arrow
                left
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                disabled={
                  currentSlide
                  === instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>
      </Box>
    </TabPanel>
  ));
  return (
    <Box>
      <Tabs
        orientation="vertical"
        variant="solid-rounded"
        colorScheme="whatsapp"
        isLazy
        px={8}
        py={71}
        mx="auto"
      >
        {Categories}
        <TabPanels>{Apps}</TabPanels>
      </Tabs>
    </Box>
  );
};
export default PackagesList;
