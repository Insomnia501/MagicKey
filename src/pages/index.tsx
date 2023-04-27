import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// sections
import { HomeHero, HomeMinimal, HomeAdvan, HomePricingPlans } from '../sections/home';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Head>
        <title> The Web3 Shopify on Ton</title>
      </Head>
      <Box sx={{bgColor: '#F1DDCD'}}>
      <HomeHero />

      </Box>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'white',
        }}
      >
        <HomeMinimal />
        <HomeAdvan />
      </Box>
    </>
  );
}
