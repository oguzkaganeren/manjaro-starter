import {
  Box,
  chakra,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { packageState, Category, Package } from '../stores/PackageStore';
import PackageDetail from '../components/packageRelated/PackageDetail';
import ArrowComponent from '../components/packageRelated/ArrowComponent';
import SearchComponent from '../components/common/search/SearchComponent';
import { explorerTabState } from '../stores/ExplorerTabStore';
import useWindowDimensions from '../hooks/useWindowDimensions';

const PackageScreen: React.FC = () => {
  const packageSt = useRecoilValue(packageState);
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [tabIndex, setTabIndex] = useRecoilState(explorerTabState);
  const [loaded, setLoaded] = useState(false);
  const { width } = useWindowDimensions();
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'free',
    loop: false,
    rubberband: false,
    slides: {
      origin: 'auto',
      perView: width > 760 ? 2.2 : 1.2,
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
        md: '20em',
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
      <Box textAlign={{ lg: 'left' }}>
        <HStack display={{
          base: 'none',
          md: 'inline-flex',
        }}
        >
          <chakra.p
            mb={4}
            maxW="2xl"
            fontSize="xl"
            color="gray.500"
            _dark={{ color: 'gray.400' }}
          >
            {t(`${category.icon}Desc`)}
          </chakra.p>
        </HStack>

        <Box position="relative">
          <div ref={sliderRef} className="keen-slider">
            {Array.from(category.packages.values()).map((app: Package) => (
              <div
                className={`keen-slider__slide ${category.name}`}
              >
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
              {currentSlide !== 0 && (
                <ArrowComponent
                  left
                  onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                />
              )}

              {currentSlide !== category.packages.size - 2 && (
                <ArrowComponent
                  onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                />
              )}
            </>
          )}
        </Box>
      </Box>
    </TabPanel>
  ));
  return (
    <Box
      width="full"
      mt={{ base: 4, md: 10 }}
      mb={20}
      px={2}
      pt={50}
    >
      <SearchComponent isForPackage />
      <Tabs
        orientation="vertical"
        variant="unstyled"
        colorScheme="whatsapp"
        isLazy
        py={5}
        display="grid"
        index={tabIndex}
        gridTemplateColumns="auto 1fr"
        onChange={(index) => {
          setCurrentSlide(0);
          setTabIndex(index);
        }}
      >
        {Categories}

        <TabPanels overflow="scroll">

          {Apps}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default PackageScreen;
