import { useState } from 'react';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// auth
import AuthGuard from '../../auth/AuthGuard';
//
import Main from './Main';
import Header from './header';
import NavVertical from './nav/NavVertical';

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
  switchTab: (index: number)=> void;
};

export default function DashboardLayout({ children, switchTab }: Props) {

  const isDesktop = !useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const handleOpen = (index: number) => {
    setOpen(true);
    switchTab(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderContent = () => {
    return (
      <>
        <Header onOpenNav={handleOpen} />
        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          <Main>{children}</Main>
        </Box>
      </>
    );
  };

  return <AuthGuard> {renderContent()} </AuthGuard>;
}
