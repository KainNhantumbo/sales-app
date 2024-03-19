import { useEffect, useState } from 'react';

export function useInnerWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onResize = (): void => {
    setSize({
      width: +innerWidth.toFixed(0),
      height: +innerHeight.toFixed(0)
    });
  };

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return { ...size };
}
