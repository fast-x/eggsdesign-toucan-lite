import React, { useEffect, useState } from 'react';
import Button from './Button';
import { ButtonVariant } from '../../@types';

const JumpToTop: React.FC = (): JSX.Element | null => {
  const [windowLoaded, setWindowsLoaded] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    setWindowsLoaded(true);
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!windowLoaded) {
    return null;
  }
  return (
    <>
      {showButton && (
        <Button
          variant={ButtonVariant.TEXT}
          onClick={() => scrollToTop()}
          title={'Scroll to page top'}
          aria-label={'Scroll to page top'}>
          Back to top
        </Button>
      )}
    </>
  );
};

export default JumpToTop;
