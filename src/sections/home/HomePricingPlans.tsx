import { useState, useEffect, useRef } from 'react';
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Tab, Tabs, Stack, Button, Dialog } from '@mui/material';

// _mock_
import { _homePlans } from '../../_mock/arrays';
import Image from '../../components/image';
import TimerComponent from './TimerComponent';

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#1C1C26',
  width: '100%',
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyleTitle = styled('p')(({ theme }) => ({
  lineHeight: '40px',
  fontSize: '40px',
  fontWeight: 700,
  display: 'flex',
  flexDirection: 'column',
  color: '#B2F81F',
  marginTop: '100px',
}));
const StyledContainer = styled('div')(({ theme }) => ({
  width: '50%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
}));

const StyledCardContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '100px',
  borderRadius: '32px',
  paddingBottom: '32px',
  paddingTop: '32px',
  paddingLeft: '60px',
  paddingRight: '60px',
  width: '320px',
}));
const StyleCardTitle = styled('p')(({ theme }) => ({
  lineHeight: '48px',
  fontSize: '48px',
  fontWeight: 700,
  color: 'black',
  marginTop: '30px',
}));
const StyleCardTime = styled('p')(({ theme }) => ({
  lineHeight: '24px',
  fontSize: '16px',
  fontWeight: 700,
  color: 'black',
}));
const StyleCardPay = styled('p')(({ theme }) => ({
  lineHeight: '24px',
  fontSize: '16px',
  fontWeight: 700,
  color: 'black',
}));

const StyleCardPrice = styled('p')(({ theme }) => ({
  lineHeight: '24px',
  fontSize: '16px',
  fontWeight: 400,
  color: '#9898A7',
  marginTop: '32px',
  textDecoration: 'line-through',
}));
const StyleCardUsers = styled('p')(({ theme }) => ({
  lineHeight: '22px',
  fontSize: '14px',
  fontWeight: 400,
  color: '#9898A7',
  marginTop: '32px',
}));
const StyleButton = styled(Button)({
  backgroundColor: '#B2F81F',
  color: 'black',
  fontWeight: 600,
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


export default function HomePricingPlans() {
  const [open, setOpen] = useState(false);

  const cards = [
    {
      price: 30,
      originPrice: 50,
      users: 100,
      type: 0,
      time: 1696089600,
    },
    {
      price: 30,
      originPrice: 50,
      users: 201,
      type: 1,
      time: 1696089600,
    },
  ];


  // eslint-disable-next-line react/no-unstable-nested-components
  function Content() {
    return <StyledContainer>{cards.map((card) => getCard(card))}</StyledContainer>;
  }

  function getCard(card: any) {
    return (
      <StyledCardContainer>
        <Image
          src={card.type === 1 ? '/assets/images/img_gem.png' : '/assets/images/img_diamond.png'}
          sx={{ width: 96, height: 96 }}
        />
        <StyleCardTitle>{card.price}</StyleCardTitle>
        <StyleCardTime>{card.type === 1 ? '/Year' : '/Month'}</StyleCardTime>
        <StyleCardPrice>{`${card.originPrice}U/Month`}</StyleCardPrice>
        <TimerComponent time={cards[0].time} />
        <StyleCardUsers>{`${card.users} Paid Users`}</StyleCardUsers>
        <StyleButton
          onClick={() => {
            setOpen(true);
          }}
        >
          Pay
        </StyleButton>
      </StyledCardContainer>
    );
  }

  function pay() {
    setOpen(false);
  }

  return (
    <StyledRoot>
      <StyleTitle>Pick your Premium</StyleTitle>
      <Content />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <StyledCardContainer>
          <StyleCardPay>选择支付方式</StyleCardPay>
          <StyleCardUsers
            onClick={() => {
              pay();
            }}
          >
            ETH
          </StyleCardUsers>
          <StyleCardUsers>USDT</StyleCardUsers>
        </StyledCardContainer>
      </Dialog>
    </StyledRoot>
  );
}
