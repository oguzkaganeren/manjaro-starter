import { Checkbox, SimpleGrid, Spinner } from '@chakra-ui/react';
import React from 'react';
import Pagination from '@choc-ui/paginator';
import { t } from 'i18next';
import { useRecoilState } from 'recoil';
import countryState from '../../../../stores/CountryStore';
import useCountryHook from './useCountryHook';

const CountryList = () => {
  const [checkedItems, setCheckedItems] = useRecoilState(countryState);
  const { countries } = useCountryHook();
  const allChecked = checkedItems.size === countries?.length;
  const isIndeterminate = checkedItems.size > 0 && !allChecked;
  const [current, setCurrent] = React.useState(1);
  const pageSize = 18;
  const offset = (current - 1) * pageSize;
  const slicedCountries = countries?.slice(offset, offset + pageSize);

  if (countries === undefined) return <Spinner />;
  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        colorScheme="green"
        onChange={(e) => {
          if (e.target.checked) {
            const temp = new Map();
            countries.map((val) => temp.set(val, e.target.checked));
            setCheckedItems(temp);
          } else {
            setCheckedItems(new Map());
          }
        }}
      >
        {t('all')}
      </Checkbox>
      {countries && (
        <SimpleGrid mt={5} columns={3} spacing={4}>
          {slicedCountries?.map((country) => (
            <Checkbox
              value={country}
              colorScheme="green"
              isChecked={checkedItems.has(country)}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedItems(
                    new Map(checkedItems.set(e.target.value, e.target.checked)),
                  );
                } else {
                  checkedItems.delete(e.target.value);
                  setCheckedItems(new Map(checkedItems));
                }
              }}
            >
              {country.replace('_', ' ')}
            </Checkbox>
          ))}
        </SimpleGrid>
      )}
      <Pagination
        size="sm"
        current={current}
        onChange={(page) => {
          setCurrent(page as number);
        }}
        pageSize={pageSize}
        total={countries?.length}
        colorScheme="green"
        paginationProps={{
          mt: 5,
          bottom: 57,
          display: 'flex',
          pos: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </>
  );
};
export default CountryList;
