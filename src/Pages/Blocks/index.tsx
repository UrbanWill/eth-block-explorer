import { FC } from 'react';
import useGetLatestBlocks from '../../hooks/queries/useGetLatestBlocks';

const Blocks: FC = () => {
  const { data, isLoading } = useGetLatestBlocks();

  console.log(data);

  return (
    <div>
      <p>Blocks</p>
      {isLoading ? <p>Loading...</p> : <p>{`Got data for the latest N blocks: ${data?.length}`}</p>}
    </div>
  );
};

export default Blocks;
