import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
// @mui
import { styled, keyframes } from '@mui/material/styles';
import { Box, Typography, Stack, Grid, Button } from '@mui/material';
import Image from '../../components/image';
import { textGradient } from '../../utils/cssStyles';
import { MotionContainer, varFade } from '../../components/animate';
import { useTransaction } from 'wagmi';
import '@fontsource/poppins';
import Modal from '@mui/material/Modal';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#191B21',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  // padding: theme.spacing(15, 0),
  height: '100%',
}));

const StyledGradientText = styled('p')(({ theme }) => ({
  ...textGradient(`180deg,#0EFFFF 16.97%, #B2F81F 77.35%`),
  fontFamily: 'SF Pro',
  fontSize: '64px',
  fontWeight: 700,
  lineHeight: '76px',
  textAlign: 'left',
}));

const LaunchButton = styled(Button)({
  backgroundColor: '#B2F81F',
  color: 'black',
  fontWeight: 500,
  borderRadius: 32,
  borderWidth: 1,
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingLeft: '32px',
  paddingRight: '32px',
  marginTop: '20px',
  boxShadow: '1px 1px 1px #B2F81F',
  '&:hover': {
    backgroundColor: '#B2F81F',
  },
});
const ClaimButton = styled(Button)({
  backgroundColor: '#0EFFFF',
  color: 'black',
  fontWeight: 500,
  borderRadius: 32,
  borderWidth: 1,
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingLeft: '32px',
  paddingRight: '32px',
  marginTop: '20px',
  boxShadow: '1px 1px 1px #0EFFFF',
  '&:hover': {
    backgroundColor: '#0EFFFF',
  },
});
const Y = keyframes`
from {
  transform: translateY(0rem);
}
to {
  transform: translateY(-1080px);
}
`;

const AnimText = styled('p')({
  fontWeight: 'bold',
  fontSize: '128px',
  lineHeight: '180px',
  fontFamily: 'Poppins',
  color: 'white',
  animation: `${Y} 8s linear infinite`,
});
const AnimContainer = styled('div')({
  background: 'linear-gradient(to bottom, #191B21, transparent)',
  height: '1080px',
  width: '100%',
  position: 'absolute',
  top: 0,
});
export default function HomeHero() {
  const { scrollYProgress } = useScroll();

  const [hide, setHide] = useState(false);

  const { data, isError, isLoading } = useTransaction({
    hash: '0x089fa309971e3f31ab1c380195ff6309e698c09037a459fb9551882c9356f2bf',
  });

  if (isLoading) {
    console.log('is Loading');
  }

  if (isError) {
    console.log('is Error');
  }

  if (data) {
    console.log('data ', data);
  }

  useEffect(
    () =>
      scrollYProgress.onChange((scrollHeight) => {
        if (scrollHeight > 0.8) {
          setHide(true);
        } else {
          setHide(false);
        }
      }),
    [scrollYProgress]
  );

  if (hide) {
    return null;
  }

  return (
    <>
      <StyledRoot>
        <Box sx={{ height: 1, flexGrow: 1 }} />
        <Box sx={{ height: 1, flexGrow: 3 }}>
          <Description />
        </Box>
        <Box sx={{ height: 1, flexGrow: 5 }}>
          <Content />
          <Box sx={{ height: 1, flexGrow: 1 }} />
        </Box>
      </StyledRoot>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

function Description() {
  const onBtnClick = () => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const [hasBayc, setHasBayc] = useState(false);
  const [claim, setClaim] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [isVerifing, setIsVerifing] = useState(false);
  const [isBAYCVerifing, setIsBAYCVerifing] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const onClaim = () => {
    setClaim(true);
  };

  const onVerify = () => {
    // setClaim(false);
    // setHasBayc(true);
    setIsBAYCVerifing(true);
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleAlertClose = () => {
    setSuccess(false);
    setHasBayc(false);
  };

  const handleNext = () => {
    if (activeStep === 2) {
      setOpen(false);
      setSuccess(true);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const getSBT = () => {};

  const steps = ['Get your own key', 'Add addresss', 'Share'];
  return (
    <StyledDescription>
      <m.div variants={varFade().in}>
        <StyledGradientText>
          Take your magic key <br /> to move freely <br /> in Web3
        </StyledGradientText>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'left',
            color: '#EFEFF3',
            marginTop: '24px',
            fontSize: '16px',
            lineHeight: '24px',
          }}
        >
          A privacy-preserving decentralized authority management solution <br /> based on MPC&ZKP
          <br />
        </Typography>
      </m.div>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <LaunchButton sx={{ marginTop: '24px' }} onClick={onBtnClick}>
          Get Key
        </LaunchButton>
        <ClaimButton sx={{ marginTop: '24px', marginLeft: '30px' }} onClick={onClaim}>
          Has BAYC
        </ClaimButton>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: '80%',
            height: '50%',
            backgroundColor: 'white',
            marginLeft: '10%',
            marginRight: '10%',
            borderRadius: '20px',
            marginTop: '10%',
            padding: '50px',
            position: 'relative',
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box
            sx={{
              paddingTop: '20px',
              paddingBottom: '20px',
              paddingLeft: '40px',
              paddingRight: '40px',
            }}
          >
            {activeStep === 0 && (
              <LaunchButton sx={{ marginTop: '24px' }} onClick={getSBT}>
                Get SBT
              </LaunchButton>
            )}
            {activeStep === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <TextField id="standard-basic" label="Address" variant="standard" />
                {!isVerifing && (
                  <Button
                    onClick={() => {
                      setIsVerifing(true);
                    }}
                  >
                    Verify
                  </Button>
                )}
                {isVerifing && <CircularProgress color="success" />}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              pt: 2,
              justifyContent: 'space-between',
              paddingLeft: '30px',
              paddingRight: '30px',
              position: 'absolute',
              bottom: '20px',
              width: '80%',
            }}
          >
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Button color="inherit" onClick={handleNext} sx={{ mr: 1 }}>
              {activeStep === 2 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={claim}
        onClose={() => {
          setClaim(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: '30%',
            height: '40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            marginLeft: '35%',
            marginRight: '35%',
            borderRadius: '20px',
            marginTop: '20%',
            padding: '50px',
            position: 'relative',
            justifyContent: 'center',
          }}
        >
          <Image src='/assets/bayc.gif' sx={{ width: '100px', height: '100px', borderRadius: '100px'}} />
          { !isBAYCVerifing && <LaunchButton onClick={onVerify}>Verify</LaunchButton>}
          { isBAYCVerifing && <CircularProgress sx={{ marginTop: '20px'}} color="success" />}
        </Box>
      </Modal>
      <Snackbar open={success} autoHideDuration={1000} onClose={handleClose}>
        <MuiAlert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          Create Successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar open={hasBayc} autoHideDuration={1000} onClose={handleClose}>
        <MuiAlert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          You have BAYC!
        </MuiAlert>
      </Snackbar>
    </StyledDescription>
  );
}
// ----------------------------------------------------------------------
function Content() {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        height: '1080px',
        overflow: 'hidden',
        position: 'absolute',
        marginTop: '100px',
      }}
    >
      <AnimText>WEB3</AnimText>
      <AnimText>Privacy</AnimText>
      <AnimText>NFT</AnimText>
      <AnimText>Asset</AnimText>
      <AnimText>ZKP</AnimText>
      <AnimText>Token</AnimText>

      <AnimText>WEB3</AnimText>
      <AnimText>Privacy</AnimText>
      <AnimText>NFT</AnimText>
      <AnimText>Asset</AnimText>
      <AnimText>ZKP</AnimText>
      <AnimText>Token</AnimText>
      <AnimContainer />
    </Stack>
  );
}
