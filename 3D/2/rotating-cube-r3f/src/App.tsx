import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import "./App.css";

function App() {
  const cube = useRef<Mesh>(null);

  useFrame(() => {
    if (cube.current) {
      cube.current.rotation.x += 0.01;
      cube.current.rotation.y += 0.01;
      cube.current.position.z = Math.sin(Date.now() / 500) * 2;
    }
  });

  return (
    <mesh ref={cube}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0xffffff} />
    </mesh>
  );
}

export default App;
