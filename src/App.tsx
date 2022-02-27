import { FC } from 'react';
import './App.css';
import { RouteRenderer } from './Routes';
import { Navbar } from './Components/Common';
import Layout from './Components/Common/Layout';

const App: FC = () => (
  <div className="App">
    <Navbar />
    <Layout>
      <RouteRenderer />
    </Layout>
  </div>
);

export default App;
