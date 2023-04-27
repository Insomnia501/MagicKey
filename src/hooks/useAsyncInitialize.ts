import { useEffect, useState } from 'react';

export function useAsyncInitialize<T>(func: Function) {
  const [state, setState] = useState<T | undefined>();
  useEffect(() => {
    console.log('useAsyncInitialize');

    // (async () => {
    //   setState(await func());
    // })();
  });
  return state;
}
