import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { EthersContext } from '../Contexts/useEthers';
import { EthersContextInterface } from '../../types';

const BLOCKS_TO_GET = 10;

/** useGetLatestBlocks is a hook to get the data of the latest N blocks */
const useGetLatestBlocks = () => {
  const [latestBlocksData, setLatestBlocksData] = useState<ethers.providers.Block[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { provider } = useContext(EthersContext) as EthersContextInterface;

  /** Gets the data of the latest N blocks */
  const getBlocksData = async (blocks: number[]) => {
    const blocksData = await Promise.all(blocks.map((block) => provider.getBlock(block).then((res) => res)));
    setLatestBlocksData(blocksData);
    setIsLoading(false);
  };

  useEffect(() => {
    /** Gets the latest block number on mount, calls getBlocksData with a decrescent array of the top N blocks */
    provider.getBlockNumber().then((blockNumber) => {
      let counter = 0;
      const blockNumbers = [];
      while (counter < BLOCKS_TO_GET) {
        blockNumbers.push(blockNumber - counter);
        counter += 1;
      }
      getBlocksData(blockNumbers);
    });
    /** Subscribe to newest blocks, insert it at index 0 and remove oldest block from array */
    provider.on('block', (blockNumber) => {
      provider.getBlock(blockNumber).then((res) => {
        setLatestBlocksData((prev) => [res, ...prev.slice(0, -1)]);
      });
    });
  }, []);

  return { data: latestBlocksData, isLoading };
};

export default useGetLatestBlocks;
