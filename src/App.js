import { useState } from 'react';
import { Game } from './components/Game';
import { Settings } from './components/Settings';

const DEFAULT_CONFIG = {
  rows: 15,
  cols: 15,
  tickTime: 150,
  borders: false,
};
const getConfigHash = (config) => Object.values(config).join('_');

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  return (
    <>
      <Game key={getConfigHash(config)} config={config} />
      <Settings values={config} onChange={setConfig} />
    </>
  );
}
