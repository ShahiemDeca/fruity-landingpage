import "./scss/main.scss";

import React, { useRef, useState } from "react";
import Header from "./components/Header";
import FloatingParticles from "./components/FloatingParticles";

export const activeHeaderContext = React.createContext(null);

const App = () => {
  const [header, setActiveHeader] = useState(0);

  const overlays = [
    {
      label: "Pear",
      src: "pear-label.png",
      background: "#C9E78A",
      ref: useRef(null),
    },
    {
      label: "Apple",
      src: "apple-label.png",
      background: "#FFA3BE",
      ref: useRef(null),
    },
    {
      label: "Exotic",
      src: "exotic-label.png",
      background: "#C1BEFF",
      ref: useRef(null),
    },
  ];

  const fallbackParticles = ["leaves.png", "passionfruit.png"];
  const particles = [
    { images: ["leaves.png", "pear.png"] },
    { images: ["leaves.png", "passionfruit.png"] },
    { images: ["leaves.png", "apple.png"] },
  ];

  return (
    <activeHeaderContext.Provider value={{ header, setActiveHeader }}>
      <Header overlays={overlays} />
      <FloatingParticles
        particles={
          particles[header] ? particles[header].images : fallbackParticles
        }
      />
    </activeHeaderContext.Provider>
  );
};

export default App;
