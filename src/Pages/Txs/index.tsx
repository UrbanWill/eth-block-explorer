import { FC, useMemo, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CellProps } from 'react-table';
import { ethers } from 'ethers';
import useGetBlockTransaction from '../../hooks/queries/useGetBlockTransactions';
import { Table, Button } from '../../Components/Common';
import { ValueHeader, EthersContextInterface } from '../../types';
import { EthersContext } from '../../hooks/Contexts/useEthers';

import './txs.css';

const Txs: FC = () => {
  const { blockId } = useParams();
  const { connectedWallet } = useContext(EthersContext) as EthersContextInterface;
  const [filteredTransactions, setFilteredTransactions] = useState<ethers.providers.TransactionResponse[]>([]);
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  const { isLoading, data, timestamp } = useGetBlockTransaction(Number(blockId));

  /** filter connected wallet transactions */
  useEffect(() => {
    if (toggleFilter) {
      const myTransactions = data.filter(
        (transaction) =>
          transaction.from.toUpperCase() === connectedWallet.toUpperCase() ||
          transaction.to?.toUpperCase() === connectedWallet.toUpperCase()
      );
      setFilteredTransactions(myTransactions);
    }
  }, [toggleFilter, data]);

  /** Toggles between filter/no filter
   * only toggle if there is a wallet connected
   */
  const handleClick = () => {
    if (connectedWallet) {
      setToggleFilter((prev) => !prev);
    }
  };

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

  const tableData = toggleFilter ? filteredTransactions : data;

  return (
    <>
      <div className="txn-title-container">
        <h2>Transactions</h2>
        <Button
          label={`${toggleFilter ? 'Display all transactions' : 'Display only my transactions'}`}
          onHandleClick={handleClick}
          isDisabled={!connectedWallet}
        />
      </div>
      {tableData.length ? (
        <Table columns={columns} data={tableData} showPagination />
      ) : (
        <div className="txn-no-txn-message">
          <h3>No transactions</h3>
        </div>
      )}
    </>
  );
};

export default Txs;
