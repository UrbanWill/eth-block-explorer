import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CellProps } from 'react-table';
import useGetLatestBlocks from '../../hooks/queries/useGetLatestBlocks';
import { Table } from '../../Components/Common';
import { getTimestamp } from '../../utils';
import { blockHeader, timestampHeader, transactionsHeader } from '../../types';

import './blocks.css';

const Blocks: FC = () => {
  const { data, isLoading } = useGetLatestBlocks();

  const columns = useMemo(
    () => [
      {
        Header: 'Block',
        accessor: 'number',
        Cell: ({ cell: { value } }: CellProps<blockHeader>) => (
          <Link to={`/txs/${value}`} className="block-header-link">
            {value}
          </Link>
        ),
        className: 'block-header-md'
      },
      {
        Header: 'Timestamp',
        accessor: 'timestamp',
        Cell: ({ cell: { value } }: CellProps<timestampHeader>) => getTimestamp(value),
        className: 'block-header-md'
      },
      {
        Header: 'Transactions',
        accessor: 'transactions',
        Cell: ({ cell: { value } }: CellProps<transactionsHeader>) => value.length,
        className: 'block-header-md'
      },
      {
        Header: 'Hash',
        accessor: 'hash'
      }
    ],
    []
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h2>Blocks</h2>
      <Table columns={columns} data={data} showPagination />
    </div>
  );
};

export default Blocks;
