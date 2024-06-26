import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Canvas } from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Canvas
      camera={{
        fov: 90,
        near: 0.1,
        far: 1000,
      }}
    >
      <App />
    </Canvas>
  </React.StrictMode>
);
