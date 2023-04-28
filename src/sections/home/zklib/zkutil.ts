import { providers } from 'ethers';
import { generateSigProofCallData, generateMerkleProofCallData } from './Library';
import { MerkleTree } from './MerkleTree';
import poseidon1 from './Poseidon';

const addrCollection = [
  "0xdb5485C85Bd95f38f9def0cA85499eF67dC581c0",
  "0xDBfD76AF2157Dc15eE4e57F3f942bB45Ba84aF24",
  "0xe2A83b15FC300D8457eB9E176f98d92a8FF40a49",
  "0x08c1AE7E46D4A13b766566033b5C47c735e19F6f",
  "0x98E711f31E49C2e50C1A290b6F2b1e493E43EA76",
  "0xf090Eb4c2B63e7B26E8Bb09e6Fc0cC3A7586263B",
  "0xF02e86D9E0eFd57aD034FaF52201B79917fE0713",
  "0xd99cEbf3C817D7360F46ED055194034d63C255E3"
]

// for verify the eth_addr ownership
async function calculateSigProof(privateKey: string) {
  // Connect to wallet, get address
  const provider = new providers.Web3Provider(window.ethereum as any);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  // Load files and run proof locally
  // TODO: zkey file path
  const zkFilePath = '';
  const wasmBuff = await getFileBuffer(`${zkFilePath}/circuit.wasm`);
  const zkeyBuff = await getFileBuffer(`${zkFilePath}/circuit_final.zkey`);

  const preTime = new Date().getTime();
  const proof = await generateSigProofCallData(privateKey, wasmBuff, zkeyBuff);
  const elapsed = new Date().getTime() - preTime;
  console.log(`Time to compute proof: ${elapsed}ms`);
  return proof;
}

// for verify the eth_addr hold certain resource
export default async function calculateMerkleProof(mainAddr: BigInt) {
  // Connect to wallet, get address
  const provider = new providers.Web3Provider(window.ethereum as any);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  // Load files and run proof locally
  // TODO: zkey file path
  const zkFilePath = '../../../../public/circuits';
  // TODO: address set
  //const mtSs = await getFileString(`${zkFilePath}/mt_8192.txt`);
  const mtLeaves: BigInt[] = [];
  for (let i = 0; i < addrCollection.length; i++) {
    const addrHash = await poseidon1(BigInt(addrCollection[i]));
    mtLeaves.push(addrHash);
  }
  console.log(mtLeaves);
  const wasmBuff = await getFileBuffer(`${zkFilePath}/circuit.wasm`);
  console.log(wasmBuff);
  const zkeyBuff = await getFileBuffer(`${zkFilePath}/circuit_final.zkey`);
  console.log(zkeyBuff);
  // Load the Merkle Tree locally
  //const mt = MerkleTree.createFromStorageString(mtSs);
  const mt = await MerkleTree.createFromLeaves(mtLeaves)
  const preTime = new Date().getTime();
  const [proof, root_val] = await generateMerkleProofCallData(mt, mainAddr, address, wasmBuff, zkeyBuff);
  const elapsed = new Date().getTime() - preTime;
  console.log(`Time to compute proof: ${elapsed}ms`);
  return [proof, root_val];
}


async function getFileString(filename: string) {
  const req = await fetch(filename);
  return req.text();
}
async function getFileBuffer(filename: string) {
  const req = await fetch(filename);
  return Buffer.from(await req.arrayBuffer());
}
