import { ethers } from 'ethers';

export interface EthersContextInterface {
  provider: ethers.providers.Provider;
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
