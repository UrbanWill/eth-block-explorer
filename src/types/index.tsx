import { ethers } from 'ethers';

export interface EthersContextInterface {
  provider: ethers.providers.Provider;
}

// TODO: improve this interface
interface Transaction {
  chanId: number;
}

export interface BlockInterface {
  hash: string;
  miner: string;
  nonce: string;
  number: number;
  timestamp: number;
  transactions: string[] | Transaction[];
}

export interface blockHeader {
  value: number;
}

export interface timestampHeader {
  value: number;
}

export interface transactionsHeader {
  value: [];
}
