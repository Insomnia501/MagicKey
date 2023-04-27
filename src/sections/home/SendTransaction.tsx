import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { utils } from 'ethers';
import axios from '../../utils/axios';
import { Button } from '@mui/material';

export default function SendTransaction() {
  const [to, setTo] = useState('');
  const [debouncedTo] = useDebounce(to, 500);

  const [amount, setAmount] = useState('');
  const [debouncedAmount] = useDebounce(amount, 500);

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
    },
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  //TODO: 通过 hash 去检查
  const doubleCheck = async () => {
    const url = '/api/account/account/check';
    axios.get(url, {
      params: {
        hash: data?.hash,
      }
    }).then((res) => {
      const data = res.data;
      console.log('Check: ', data);
    })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendTransaction?.();
      }}
    >
      <input
        aria-label="Recipient"
        onChange={(e) => setTo(e.target.value)}
        placeholder="0xA0Cf…251e"
        value={to}
      />
      <input
        aria-label="Amount (ether)"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.00001"
        value={amount}
      />

      <Button variant="contained">Contained</Button>

      <button disabled={isLoading || !sendTransaction || !to || !amount}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>

      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
}
