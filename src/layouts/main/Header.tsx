// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, BoxProps } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
//
import Image from '../../components/image';
import WalletConnectButton from './WalletConnectButton';


export default function Header() {
  const theme = useTheme();
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);
  return (
    <AppBar color="transparent" sx={{ boxShadow: 0, width: '100vw' }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          backgroundColor: '#191B21',
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: '#191B21' }),
            height: {
              xs: HEADER.H_MOBILE,
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Box sx={{ height: 1, display: 'flex', alignItems: 'center', width: '100%', marginLeft: 0, marginRight: 0,}}>
          <Box sx={{ flexGrow: 0.1, height: 1, }} />
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
            Magic Key
          </p>
          <Box sx={{ flexGrow: 1, height: 1, }} />
          <WalletConnectButton />
          <Box sx={{ flexGrow: 0.1, height: 1, }} />
        </Box>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
