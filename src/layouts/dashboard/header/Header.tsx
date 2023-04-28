// @mui
import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, Button, Box, Tabs, Tab } from '@mui/material';
// utils
import Image from 'src/components/image/Image';
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../../config-global';
import { useSettingsContext } from '../../../components/settings';

type Props = {
  onOpenNav: (value: number) => {};
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onOpenNav(newValue);
  };

  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const renderContent = (
    <>
      <Image src="/assets/icon.png" sx={{ width: 20 }} />
      <p
        style={{
          color: 'white',
          fontWeight: 900,
          fontSize: 19,
          lineHeight: 23,
          marginLeft: 6,
        }}
      >
        KOL Hunter
      </p>
      <Box sx={{ flexGrow: 1, height: 1 }} />
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Tabs value={value} aria-label="basic tabs example" onChange={handleChange}>
          <Tab label="Discover" />
          <Tab label="Follow" />
          <Tab label="Anylysis" />
        </Tabs>
      </Stack>
      <Box sx={{ flexGrow: 1, height: 1 }} />
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: '#191B21',
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100%}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: '#191B21',
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100%)px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          bgcolor: '#191B21',
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
