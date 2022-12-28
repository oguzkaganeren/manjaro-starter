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
import { packageState, Category, Package } from '../stores/PackageStore';
import PackageDetail from '../components/PackageRelated/PackageDetail';
import ArrowComponent from '../components/PackageRelated/ArrowComponent';

const PackageScreen: React.FC = () => {
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
        <Tab>{t(category.icon)}</Tab>
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
          {t(category.icon)}
        </chakra.p>
        <chakra.p
          mt={4}
          maxW="2xl"
          fontSize="xl"
          color="gray.500"
          _dark={{ color: 'gray.400' }}
        >
          {t(`${category.icon}Desc`)}
        </chakra.p>
        <Box position="relative">
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
              <ArrowComponent
                left
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                disabled={currentSlide === 0}
              />

              <ArrowComponent
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                disabled={
                  currentSlide
                  === instanceRef.current.track.details.slides.length - 2
                }
              />
            </>
          )}
        </Box>
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
export default PackageScreen;
