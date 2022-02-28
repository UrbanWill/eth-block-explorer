import { useContext, useEffect, useState } from 'react';
import { EthersContext } from '../Contexts/useEthers';
import { EthersContextInterface, BlockInterface } from '../../types';

const BLOCKS_TO_GET = 10;

/** useGetLatestBlocks is a hook to get the data of the latest N blocks */
const useGetLatestBlocks = () => {
  const [latestBlocksData, setLatestBlocksData] = useState<BlockInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { provider } = useContext(EthersContext) as EthersContextInterface;

  /** Gets the data of the latest N blocks */
  const getBlocksData = async (blocks: number[]) => {
    const blocksData = await Promise.all(blocks.map((block) => provider.getBlock(block).then((res) => res)));
    setLatestBlocksData(blocksData);
    setIsLoading(false);
  };

  /** Gets the latest block number on mount, calls getBlocksData with a decrescent array of the top N blocks */
  useEffect(() => {
    provider.getBlockNumber().then((res) => {
      let counter = 0;
      const blockNumbers = [];
      while (counter < BLOCKS_TO_GET) {
        blockNumbers.push(res - counter);
        counter += 1;
      }
      getBlocksData(blockNumbers);
    });
  }, []);

  return { data: latestBlocksData, isLoading };
};

export default useGetLatestBlocks;
