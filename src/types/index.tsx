import { ethers } from 'ethers';

export interface EthersContextInterface {
  provider: ethers.providers.Provider;
}

export interface BlockHeader {
  value: number;
}

export interface TimestampHeader {
  value: number;
}

export interface TransactionsHeader {
  value: [];
}

export interface ValueHeader {
  value: string;
}
