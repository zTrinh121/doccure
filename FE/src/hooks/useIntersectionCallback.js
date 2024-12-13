import { useEffect, useRef } from 'react';

export const useIntersectionCallback = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const contRef = containerRef.current;
    const options = {
      root: null,
      rootMargin: '0px',
    };
    const intersectCallback = (entries) => {
      const [entry] = entries;
      if (hasNextPage && !isFetchingNextPage && entry.isIntersecting) {
        fetchNextPage();
      }
    };
    const observer = new IntersectionObserver(intersectCallback, options);
    if (contRef) observer.observe(contRef);
    return () => {
      if (contRef) observer.unobserve(contRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return containerRef;
};
