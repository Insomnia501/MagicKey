import { MerkleTree } from './MerkleTree';
import poseidon1 from './Poseidon';

const snarkjs = require('snarkjs');

export async function generateSigProofCallData(
  privateKey: string,
  circuitWasmBuffer: Buffer,
  zkeyBuffer: Buffer
): Promise<any> {
  const privateKeyChunks = splitPrivateKey2(privateKey);
  const inputs = await generateSigCircuitInputJson(privateKeyChunks);
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    inputs,
    circuitWasmBuffer,
    zkeyBuffer
  );
  const proofProcessed = unstringifyBigInts(proof);
  const pubProcessed = unstringifyBigInts(publicSignals);
  const allSolCallData: string = await snarkjs.groth16.exportSolidityCallData(
    proofProcessed,
    pubProcessed
  );
  const solCallDataProof = parseStringToArrayAdhoc(allSolCallData);
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
    mainAddr,
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
 
function splitPrivateKey2(privateKey: string): number[] {
  const keyLength = privateKey.length;
  const segmentLength = keyLength / 4; // 平均分成4份，每份长度为64 / 4 = 16
  const privateKeyChunks: number[] = [];

  for (let i = 0; i < keyLength; i += segmentLength) {
    const privateKeyDecimal = BigInt('0x'+ privateKey.slice(i, i + segmentLength));

    privateKeyChunks.push(Number(privateKeyDecimal));
  }

  return privateKeyChunks;
}

function splitPrivateKey(privateKeyHex: string): number[] {
  //if (privateKeyHex.length !== 64) {
  //  throw new Error('Invalid private key length. Expected 64 hex characters.');
  //}

  // 将私钥转换为 BigInt 类型的十进制值
  console.log(privateKeyHex);
  const privateKeyDecimal = BigInt(privateKeyHex);
  console.log(privateKeyDecimal);

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

function parseStringToArrayAdhoc(input: string): any[] {
  const removedQuotes = input.replace(/["']/g, '');
  const removedBrackets = removedQuotes.replace(/[\[\]]/g, '');
  const removedSpacesAndNewlines = removedBrackets.replace(/\s/g, '');
  const elements = removedSpacesAndNewlines.split(',');
  //const elements = elementsStr.map((e) => BigInt(e));
  const result: any = [];
  result.push([elements[0], elements[1]]);
  result.push([[elements[2], elements[3]], [elements[4], elements[5]]]);
  result.push([elements[6], elements[7]]);
  result.push([elements[8], elements[9], elements[10], elements[11], elements[12]]);
  return result;
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
    commitment: mainAddrBi,
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

