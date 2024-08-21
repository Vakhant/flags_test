import logo from './logo.svg';
import './App.css';
import data from './countries.json'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Plane, useTexture } from '@react-three/drei';
import { DoubleSide } from 'three';

const Flag = ({ url, position }) => {
  const texture = useTexture(url);
  return (
      <Plane args={[1, 1]} position={position}>
          <meshBasicMaterial map={texture} side={DoubleSide} />
      </Plane>
  );
};

const Scene = () => {
  const flagsPerRow = 5
  const spacing = 2
  const maxFlags = 30

  const countriesList = data.slice(0, maxFlags)

  return (
      <Canvas style={{"height": "100%", "width": "100%"}} camera={{ position: [0, 0, 5] }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {countriesList.map((item, index) => {
            const row = Math.floor(index / flagsPerRow)
            const col = index % flagsPerRow
            const x = (col - (flagsPerRow - 1) / 2) * spacing
            const y = -(row - (Math.ceil(countriesList.length / flagsPerRow) - 1) / 2) * spacing
              
            return(<Flag key={index} url={item.flags.svg} position={[x, y, 0]} />)
          })}
          <OrbitControls />
      </Canvas>
  );
};

function App() {
  return (
    <div style={{"height": "100%", "width": "100%"}} className="App">
      <Scene/>
    </div>
  );
}

export default App;
