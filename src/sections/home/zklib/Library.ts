import { MerkleTree } from './MerkleTree';
import { poseidon1 } from './Poseidon';

const snarkjs = require('snarkjs');

export async function generateSigProofCallData(
  privateKey: string,
  circuitWasmBuffer: Buffer,
  zkeyBuffer: Buffer
): Promise<string> {
  const privateKeyChunks = splitPrivateKey(privateKey);
  const inputs = await generateSigCircuitInputJson(privateKeyChunks);
  console.log('Debug::start prove');
  const { proof, publicSignals } = await snarkjs.plonk.fullProve(
    inputs,
    circuitWasmBuffer,
    zkeyBuffer
  );
  console.log('Debug::end prove');
  const proofProcessed = unstringifyBigInts(proof);
  const pubProcessed = unstringifyBigInts(publicSignals);
  const allSolCallData: string = await snarkjs.plonk.exportSolidityCallData(
    proofProcessed,
    pubProcessed
  );
  const solCallDataProof = allSolCallData.split(',')[0];
  return solCallDataProof;
}

export async function generateMerkleProofCallData(
  merkleTree: MerkleTree,
  mainAddr: BigInt,
  receiverAddr: string,
  circuitWasmBuffer: Buffer,
  zkeyBuffer: Buffer
): Promise<[string, BigInt]> {
  const inputs = await generateMerkleCircuitInputJson(
    merkleTree,
    BigInt(mainAddr),
    BigInt(receiverAddr)
  );

  const { proof, publicSignals } = await snarkjs.plonk.fullProve(
    inputs,
    circuitWasmBuffer,
    zkeyBuffer
  );

  const proofProcessed = unstringifyBigInts(proof);
  const pubProcessed = unstringifyBigInts(publicSignals);
  const allSolCallData: string = await snarkjs.plonk.exportSolidityCallData(
    proofProcessed,
    pubProcessed
  );
  const solCallDataProof = allSolCallData.split(',')[0];
  return [solCallDataProof, inputs['root']];
}
 

function splitPrivateKey(privateKeyHex: string): number[] {
  if (privateKeyHex.length !== 64) {
    throw new Error('Invalid private key length. Expected 64 hex characters.');
  }

  // 将私钥转换为 BigInt 类型的十进制值
  const privateKeyDecimal = BigInt(privateKeyHex);

  // 计算每部分的大小
  const chunkSize = privateKeyDecimal / BigInt(4);

  // 分割私钥
  const privateKeyChunks = [
    Number(privateKeyDecimal - chunkSize * BigInt(3)),
    Number(privateKeyDecimal - chunkSize * BigInt(2)),
    Number(privateKeyDecimal - chunkSize * BigInt(1)),
    Number(privateKeyDecimal),
  ];
  return privateKeyChunks;
}

interface SigCircuitInput {
  privkey: number[];
}

interface MerkleCircuitInput {
  root: BigInt;
  commitment: BigInt;
  pathIndices: number[];
  pathElements: BigInt[];
  recipient: BigInt;
}

async function generateSigCircuitInputJson(privateKeyChunks: number[]): Promise<SigCircuitInput> {
  const inputObj = {
    privkey: privateKeyChunks,
  };
  return inputObj;
}

async function generateMerkleCircuitInputJson(
  mt: MerkleTree,
  mainAddrBi: BigInt,
  receiverAddr: BigInt
): Promise<MerkleCircuitInput> {
  const commitment = await poseidon1(mainAddrBi);
  const mp = mt.getMerkleProof(commitment);

  const inputObj = {
    root: mt.root.val,
    commitment,
    pathIndices: mp.indices,
    pathElements: mp.vals,
    recipient: receiverAddr,
  };
  return inputObj;
}

// Lifted from ffutils: https://github.com/iden3/ffjavascript/blob/master/src/utils_bigint.js
function unstringifyBigInts(o: any): any {
  if (typeof o === 'string' && /^[0-9]+$/.test(o)) {
    return BigInt(o);
  }
  if (typeof o === 'string' && /^0x[0-9a-fA-F]+$/.test(o)) {
    return BigInt(o);
  }
  if (Array.isArray(o)) {
    return o.map(unstringifyBigInts);
  }
  if (typeof o === 'object') {
    const res: { [key: string]: any } = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = unstringifyBigInts(o[k]);
    });
    return res;
  }
  return o;
}

function toBufferLE(bi: BigInt, width: number): Buffer {
  const hex = bi.toString(16);
  const buffer = Buffer.from(hex.padStart(width * 2, '0').slice(0, width * 2), 'hex');
  buffer.reverse();
  return buffer;
}
