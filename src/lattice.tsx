import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';

interface AtomProps {
  position: [number, number, number];
}

const Atom: React.FC<AtomProps> = ({ position }) => (
  <Sphere position={position} args={[0.5, 16, 16]}>
    <meshStandardMaterial color="red" />
  </Sphere>
);

const generateLatticePositions = (size: number, distance: number): Array<[number, number, number]> => {
  const positions: Array<[number, number, number]> = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        positions.push([x * distance, y * distance, z * distance]);
      }
    }
  }
  return positions;
};

const MolecularLattice = () => {
  const size = 2; // Defines the size of the lattice
  const distance = 2; // Distance between each sphere
  const positions = generateLatticePositions(size, distance);

  const lines = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const [x1, y1, z1] = positions[i];
      const [x2, y2, z2] = positions[j];
      if (
        (Math.abs(x1 - x2) === distance && y1 === y2 && z1 === z2) ||
        (Math.abs(y1 - y2) === distance && x1 === x2 && z1 === z2) ||
        (Math.abs(z1 - z2) === distance && x1 === x2 && y1 === y2)
      ) {
        lines.push([positions[i], positions[j]]);
      }
    }
  }

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {positions.map((pos, index) => (
        <Atom key={index} position={pos} />
      ))}
      {lines.map((line, index) => (
        <Line key={index} points={line} color="blue" lineWidth={1} />
      ))}
    </Canvas>
  );
};

export default MolecularLattice;