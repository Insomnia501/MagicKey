import { useState } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function CustomButton() {
  const [address, setAddress] = useState('');

  const ConnectButton = styled(Button)({
    borderColor: '#B2F81F',
    borderRadius: 20,
    width: '200px',
    borderWidth: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingLeft: '10px',
    paddingRight: '10px',
  })

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      window.open("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn");
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAddress(accounts[0]);
  }

  const onBtnClick = () => {
    connectWallet();
  }

  return (
    <ConnectButton onClick={onBtnClick} variant="outlined" color="inherit" sx={{color: '#B2F81F'}}>
      {address === '' ? 'Connect wallet' : address}
    </ConnectButton>
  );
}
