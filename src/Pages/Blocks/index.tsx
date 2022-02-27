import { FC, useContext, useEffect, useState } from 'react';
import { EthersContext } from '../../hooks/Contexts/useEthers';
import { EthersContextInterface } from '../../types';

const Blocks: FC = () => {
  const { provider } = useContext(EthersContext) as EthersContextInterface;
  const [latestBlock, setLatestBlock] = useState<number | null>(null);

  useEffect(() => {
    provider.getBlockNumber().then((res) => setLatestBlock(res));
  }, []);

  return (
    <div>
      <p>Blocks</p>
      {latestBlock && <p>{`The latest block is: ${latestBlock}`}</p>}
    </div>
  );
};

export default Blocks;
