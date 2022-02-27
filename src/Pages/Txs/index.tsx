import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Txs: FC = () => {
  const { blockId } = useParams();

  console.log(`Fetched transactions for ${blockId}`);

  return <p>Transactions from a block</p>;
};

export default Txs;
