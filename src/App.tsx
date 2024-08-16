import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MolecularLattice from './lattice';

function App() {
  const [latticePositions, setLatticePositions] = useState<Array<[number, number, number]>>([]);

  // useEffect(() => {
  //   const positions = generateLatticePositions(3); // Example size
  //   setLatticePositions(positions);
  // }, []);

  return (
    <div>
      <MolecularLattice></MolecularLattice>
    </div>
  );
}

export default App;