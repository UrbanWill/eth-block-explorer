import { FC, useContext } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import Button from '../Button';
import { EthersContextInterface } from '../../../types';
import { EthersContext } from '../../../hooks/Contexts/useEthers';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { connectedWallet, setConnectedWallet } = useContext(EthersContext) as EthersContextInterface;

  /** connects to Metamask wallet */
  const handleClick = async () => {
    if (!connectedWallet) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      signer.getAddress().then((res) => setConnectedWallet(res));
    }
  };

  return (
    <div className="navbar">
      <button type="button" className="navbar-logo-button" onClick={() => navigate('/')}>
        <h2>Blockscan</h2>
      </button>
      <Button
        onHandleClick={handleClick}
        label={`${connectedWallet ? 'Wallet connected' : 'Connect your wallet'}`}
        isDisabled={false}
      />
    </div>
  );
};

export default Navbar;
