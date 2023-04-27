import { useWeb3Modal } from '@web3modal/react';
import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function CustomButton() {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const label = isConnected ? 'Disconnected' : 'Connect Your Wallet';

  const ConnectButton = styled(Button)({
    borderColor: '#B2F81F',
    borderRadius: 20,
    borderWidth: 1,
  })

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  const onBtnClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      onOpen();
    }
  }

  return (
    <ConnectButton onClick={onBtnClick} disabled={loading} variant="outlined" color="inherit" sx={{color: '#B2F81F'}}>
      {loading ? 'Loading...' : label}
    </ConnectButton>
  );
}
