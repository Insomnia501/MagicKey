// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'Feature',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.components,
  },
  {
    title: 'About',
    path: '/pages',
    icon: <Iconify icon="eva:file-fill" />,
  },
  {
    title: 'Price',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_DOCS.root,
  },
];

export default navConfig;
