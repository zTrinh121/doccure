import { useEffect, useRef } from 'react';
import { getActions, useScrollTarget } from '../stores/scrollStore';

export const useScrollToReview = () => {
  const scrollTarget = useScrollTarget();
  const { setScrollTarget } = getActions();
  const reviewRef = useRef(null);

  useEffect(() => {
    if (scrollTarget === 'review') {
      reviewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setScrollTarget(''); //does not cause an infiniteloop because empty dependencies array but this is the definition of playing stupid games:)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return reviewRef;
};
