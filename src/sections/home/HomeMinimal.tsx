// @mui
import { styled } from '@mui/material/styles';
// components
import Image from '../../components/image';
import { m } from 'framer-motion';
import { MotionViewport, varFade } from '../../components/animate';

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#B2F81F',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyleTitle = styled('p')(({ theme }) => ({
  lineHeight: '40px',
  fontSize: '40px',
  fontWeight: 700,
  display: 'flex',
  flexDirection: 'column',
}));
const StyleContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: '60%',
  height: 'auto',
  marginTop: '20px'
}));
const StyleCardContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#FFFFFF52',
  borderRadius: '80px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '8px',
  paddingBottom: '16px',
  marginTop: '20px',
}));
const StyleNameContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  marginLeft: '16px',
}));
const StyleName = styled('p')(({ theme }) => ({
  lineHeight: '18px',
  fontSize: '16px',
  fontWeight: 400,
  color: '#1E1E1E',
  marginTop: '8px',
}));

export default function HomeMinimal() {
  const cards = [
    {
      name: 'Anya',
      problem: 'How to protect my wallet privicy?',
      img: '/assets/images/img_anya.png',
      position: '20%',
    },
    {
      name: 'Tom',
      problem: "I don't want people to know what token I bought",
      img: '/assets/images/img_auora.png',
      position: '60%',
    },
    {
      name: 'Eric',
      problem: 'How can I trust this KOL?',
      img: '/assets/images/img_eric.png',
      position: '30%',
    },
    {
      name: 'Jeremy',
      problem: 'How would I benefit from following KOL to buy cryptocurrency?',
      img: '/assets/images/img_jeremy.png',
      position: '60%',
    },
    {
      name: 'Lola',
      problem: "I don't want people to know that I have this NFT",
      img: '/assets/images/img_sola.png',
      position: '20%',
    },
    {
      name: 'John',
      problem: 'I want to tell them my total assets secretly',
      img: '/assets/images/img_money.png',
      position: '50%',
    },
  ];

  return (
    <StyledRoot>
      <m.div variants={varFade().inDown}>
        <StyleTitle>Problem</StyleTitle>
      </m.div>
      <Image src="/assets/images/img_flower.png" sx={{ width: 'auto', height: '80%' }} />
      <StyleContainer>
        {cards.map((card) =>  getCard(card))}
      </StyleContainer>
    </StyledRoot>
  );
}

function getCard(card: any) {
  return (
    <StyleCardContainer sx={{ marginLeft: card.position }}>
      <Image
        src={card.img}
        sx={{ width: '56px', height: '56px', borderRadius: '56px' }}
      />
      <StyleNameContainer>
        <StyleName>{card.name}</StyleName>
        <StyleName>{card.problem}</StyleName>
      </StyleNameContainer>
    </StyleCardContainer>
  );
}
