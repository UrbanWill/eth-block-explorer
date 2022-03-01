import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { EthersContext } from '../Contexts/useEthers';
import { EthersContextInterface } from '../../types';
import { getTimestamp } from '../../utils';

/** useGetBlockTransaction is a hook to get all the transactions sending ETH of a block and the timestamp */
const useGetBlockTransaction = (blockId: number | undefined) => {
  const [transactions, setTransactions] = useState<ethers.providers.TransactionResponse[]>([]);
  const [timestamp, setTimestamp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { provider } = useContext(EthersContext) as EthersContextInterface;

  useEffect(() => {
    if (blockId) {
      setIsLoading(true);
      provider.getBlockWithTransactions(blockId).then((res) => {
        const transactionsWithValue = res.transactions.filter(
          (transaction) => Number(ethers.utils.formatEther(transaction.value)) > 0
        );
        setTransactions(transactionsWithValue);
        setTimestamp(getTimestamp(res.timestamp));
        setIsLoading(false);
      });
    }
  }, []);

  return { data: transactions, timestamp, isLoading };
};

export default useGetBlockTransaction;
