import { FC } from 'react';
import './App.css';
import { RouteRenderer } from './Routes';
import { Navbar } from './Components/Common';
import Layout from './Components/Common/Layout';
import EthersProvider from './hooks/Contexts/useEthers';

const App: FC = () => (
  <div className="App">
    <EthersProvider>
      <Navbar />
      <Layout>
        <RouteRenderer />
      </Layout>
    </EthersProvider>
  </div>
);

export default App;
