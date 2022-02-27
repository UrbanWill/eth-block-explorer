import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Blocks, Txs, Tx } from '../../Pages';

const RouteRenderer: FC = () => (
  <Routes>
    <Route path="/" element={<Blocks />} />
    <Route path="/txs/:blockId" element={<Txs />} />
    <Route path="/tx/:transactionId" element={<Tx />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default RouteRenderer;
