import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Blocks, Txs } from '../../Pages';

const RouteRenderer: FC = () => (
  <Routes>
    <Route path="/" element={<Blocks />} />
    <Route path="/txs/:blockId" element={<Txs />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default RouteRenderer;
