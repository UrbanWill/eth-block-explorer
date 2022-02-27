import { FC, createContext, ReactNode } from 'react';
import { ethers } from 'ethers';
import { EthersContextInterface } from '../../../types';

export const EthersContext = createContext<EthersContextInterface | null>(null);

const EthersProvider: FC<ReactNode> = ({ children }) => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/b6c52587554a4eee8fa39472ed69dc60'
  );

  return <EthersContext.Provider value={{ provider }}>{children}</EthersContext.Provider>;
};

export default EthersProvider;
