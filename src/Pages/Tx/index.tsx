import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Tx: FC = () => {
  const { transactionId } = useParams();

  console.log(`Fetched data for ${transactionId}`);

  return <p>Single Transaction data</p>;
};

export default Tx;
