import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';

export default function Index() {
  const { pathname, replace, prefetch } = useRouter();

  useEffect(() => {
    // if (pathname === PATH_DASHBOARD.root) {
    //   replace(PATH_AFTER_LOGIN);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // useEffect(() => {
  //   prefetch(PATH_AFTER_LOGIN);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return null;
}
