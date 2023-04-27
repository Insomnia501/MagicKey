import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Stack } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

const CARDS = [
  {
    icon: '/assets/logo_zk.png',
    title: 'Based on ZKP',
    content: 'No one know your wallet address',
  },
  {
    icon: '/assets/logo_mpc.png',
    title: 'Based on MPC',
    content: 'All the target data source is right',
  },
  {
    icon: '/assets/img_protcol.png',
    title: 'Aggregated',
    content: 'All wallet addresses can be aggregated together',
  },
  {
    icon: '/assets/logo_friend.png',
    title: 'Easy to use',
    content: 'Just one steps get your own key',
  },
];

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  height: 300,
  padding: theme.spacing(5, 2),
  [theme.breakpoints.up('md')]: {
    boxShadow: 'none',
  },
}));

export default function HomeAdvan() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">About Magic Key</Typography>
          </m.div>
        </Stack>

        <Stack alignItems="center" justifyContent="flex-start">
          <Image src="/assets/how.jpg" alt="frame" sx={{ mx: 'auto', width: '820px', height: '550px'}} />
        </Stack>

        <Box
          gap={{ xs: 3, lg: 10 }}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          marginTop="50px"
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <StyledCard sx={{ borderRadius: 2, backgroundColor: '#F9F9FB' }}>
                <Image
                  src={card.icon}
                  alt={card.title}
                  sx={{ mx: 'auto', width: 100, height: 100 }}
                />
                <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  {card.content}
                </Typography>
              </StyledCard>
            </m.div>
          ))}
        </Box>
      </Container>
    </StyledRoot>
  );
}
