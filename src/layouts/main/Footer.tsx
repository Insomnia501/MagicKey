
// @mui
import { Box } from '@mui/material';
// routes
import { _socials } from '../../_mock/arrays';
// components
import Image from '../../components/image/Image';

export default function Footer() {
  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: '#191B21',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Image src="/assets/icon.png" sx={{ width: 20 }} />
      <p
        style={{
          color: 'white',
          fontSize: '15px',
          marginTop: '10px'
        }}
      >
         © All rights reserved
        <br /> Made by &nbsp; Magic Key
      </p>
    </Box>
  );

  return simpleFooter;
}
