import {
  Box,
  SimpleGrid,
  useColorModeValue,
  chakra,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import {
  packageState,
  Category,
  Package,
} from '../../stores/PackageStore';
import PackageDetail from './PackageDetail';

const PackagesList: React.FC = () => {
  const packageSt = useRecoilValue(packageState);
  const { t } = useTranslation();
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'free',
    loop: false,
    slides: {
      origin: 'auto',
      perView: 2.2,
      spacing: 5,
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const Categories = (
    <TabList maxH={{ lg: '4xl', sm: 'sm' }} overflow="scroll">
      {Array.from(packageSt.values()).map((category: Category) => (
        <Tab>{category.name}</Tab>
      ))}
    </TabList>
  );
  const Apps = Array.from(packageSt.values()).map((category: Category) => (
    <TabPanel key={category.id}>
      <Box textAlign={{ lg: 'left' }}>
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
        <SimpleGrid spacingX={{ base: 16, lg: 24 }} spacingY={10} mt={6}>
          <div ref={sliderRef} className="keen-slider">
            {Array.from(category.packages.values()).map((app: Package) => (
              <div className="keen-slider__slide">
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
        </SimpleGrid>
      </Box>
    </TabPanel>
  ));
  return (
    <Box px={8} py={71} mx="auto" bg={useColorModeValue('white', 'gray.800')}>
      <Tabs
        orientation="vertical"
        variant="solid-rounded"
        colorScheme="whatsapp"
        isLazy
      >
        {Categories}
        <TabPanels
          minW={{ lg: '8xl', sm: '720px' }}
          maxW={{ lg: '8xl', sm: '2xl' }}
        >
          {Apps}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default PackagesList;
