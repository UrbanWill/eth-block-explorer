import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CellProps } from 'react-table';
import { ethers } from 'ethers';
import useGetBlockTransaction from '../../hooks/queries/useGetBlockTransactions';
import { Table } from '../../Components/Common';
import { ValueHeader } from '../../types';

import './txs.css';

const Txs: FC = () => {
  const { blockId } = useParams();

  const { isLoading, data, timestamp } = useGetBlockTransaction(Number(blockId));

  const columns = useMemo(
    () => [
      {
        Header: 'Txn Hash',
        accessor: 'hash',
        className: 'txs-header-md'
      },
      {
        Header: 'Block',
        accessor: 'block',
        Cell: blockId
      },
      {
        Header: 'Timestamp',
        accessor: 'timestamp',
        Cell: timestamp
      },
      {
        Header: 'From',
        accessor: 'from',
        className: 'txs-header-md'
      },
      {
        Header: 'To',
        accessor: 'to',
        className: 'txs-header-md'
      },
      {
        Header: 'Value',
        accessor: 'value',
        Cell: ({ cell: { value } }: CellProps<ValueHeader>) => {
          /** drops any "extra" zeroes at the end, rounds to max 4 decimals */
          let parsedValue = Number(ethers.utils.formatEther(value));
          parsedValue = +parsedValue.toFixed(4);
          return `${parsedValue} Ether`;
        },
        className: 'txs-header-md'
      }
    ],
    [timestamp]
  );

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <>
      <h2>Transactions</h2>
      <Table columns={columns} data={data} showPagination />
    </>
  );
};

export default Txs;
