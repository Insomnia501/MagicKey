import { providers } from 'ethers';
import { generateSigProofCallData, generateMerkleProofCallData } from './Library';
import { MerkleTree } from './MerkleTree';

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
export default async function calculateMerkleProof(mainAddr: string) {
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
  const mtLeaves: BitInt[] = [];
  const wasmBuff = await getFileBuffer(`${zkFilePath}/circuit.wasm`);
  const zkeyBuff = await getFileBuffer(`${zkFilePath}/circuit_final.zkey`);

  // Load the Merkle Tree locally
  //const mt = MerkleTree.createFromStorageString(mtSs);
  const mt = MerkleTree.createFromLeaves(mtLeaves)

  const preTime = new Date().getTime();
  const biMainAddr = BigInt(mainAddr);
  const [proof, root_val] = await generateMerkleProofCallData(mt, biMainAddr, address, wasmBuff, zkeyBuff);
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
