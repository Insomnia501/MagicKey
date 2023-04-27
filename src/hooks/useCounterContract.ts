import { useEffect, useState } from 'react';
import { Address, OpenedContract } from 'ton-core';
import { useAsyncInitialize } from './useAsyncInitialize';
import Counter from '../contracts/counter';
import { useTonClient } from './useTonClient';
import { getHttpEndpoint } from '@orbs-network/ton-access';
// import { TonClient } from 'ton';

export function useCounterContract() {
    // const [tonClient, setTonClient] = useState<TonClient>();

    // useEffect(() => {
    //     getTonClient();
    // }, [tonClient]);

    // const getTonClient = async () => {
    //     const endpoint = await getHttpEndpoint({ network: 'testnet' });
    //     console.log('endpoint', endpoint);

    //     const client = new TonClient({ endpoint });

    //     // console.log('client', client);

    //     // setTonClient(client);
    // }

//   const client = useTonClient();
//   const [val, setVal] = useState<null | number>();

//   const counterContract = useAsyncInitialize(async () => {
//     if (!client) return;
//     console.log('client', client);
//     const contract = new Counter(
//       Address.parse('EQB8lN2zfCqoxIQv9u0iSv9p8kPV8mKKVoB9wZvYclGwTL6h') // replace with your address from tutorial 2 step 8
//     );
//     return client.open(contract) as OpenedContract<Counter>;
//   }, [client]);

//   useEffect(() => {
//     async function getValue() {
//       if (!counterContract) return;

//       setVal(null);
//       const val = await counterContract.getCounter();
//       setVal(Number(val));
//     }
//     getValue();
//   }, [counterContract]);

  return {
    value: 0,
    address: 'test',
  };
}
