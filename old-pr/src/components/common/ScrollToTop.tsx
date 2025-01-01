import React, { useState } from 'react';
import {
  IconButton,
} from '@chakra-ui/react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <IconButton
      aria-label="Scroll to Top"
      colorScheme="green"
      position="fixed"
      variant="solid"
      bottom={88}
      right={10}
      onClick={scrollToTop}
      visibility={visible ? 'visible' : 'hidden'}
      icon={<BsFillArrowUpCircleFill />}
    />
  );
};

export default ScrollToTop;
