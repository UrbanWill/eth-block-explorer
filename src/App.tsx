import { FC } from 'react';
import './App.css';
import { RouteRenderer } from './Routes';
import { Navbar } from './Components/Common';

const App: FC = () => (
  <div className="App">
    <Navbar />
    <RouteRenderer />
  </div>
);

export default App;
