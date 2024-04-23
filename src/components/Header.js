import React, { useEffect, useState, useContext } from "react";
import { gsap } from "gsap";
import { activeHeaderContext } from "../App";

const Header = ({ overlays }) => {
  const { header, setActiveHeader } = useContext(activeHeaderContext);
  const [activeOverlay, setActiveOverlay] = useState(0);

  const switchOverlay = () => {
    const currentOverlay = overlays[activeOverlay];
    const nextOverlayIndex = (activeOverlay + 1) % overlays.length;
    const nextOverlay = overlays[nextOverlayIndex];

    if (!currentOverlay || !nextOverlay) return;

    const timeline = gsap.timeline();

    // Move the current overlay to the left
    timeline.to(currentOverlay.ref.current, {
      left: "-100%",
      duration: 0.9,
      ease: "sine.inOut",
      onStart: () => setActiveHeader(nextOverlayIndex),
    });

    // Animate in the next overlay after the current one has animated out
    timeline.to(
      nextOverlay.ref.current,
      {
        left: 0,
        duration: 0.9,
        ease: "sine.inOut",
      },
      "-=1"
    );

    // Update the active overlay after animations complete and reset currentOverlay
    timeline.call(() => {
      gsap.set(currentOverlay.ref.current, { left: "100%" });
      setActiveOverlay(nextOverlayIndex);
    });
  };

  useEffect(() => {
    switchOverlay();
  }, []);

  return (
    <header className="header">
      {overlays.map((overlay, index) => (
        <div
          key={index}
          className="header-background"
          ref={overlay.ref}
          style={{
            left: index === activeOverlay ? 0 : "100%",
            background: overlay.background,
          }}
        >
          <h1>{overlay.label}</h1>
        </div>
      ))}
      <div className="header-images">
        <img className="header-beer" src="beer.png" alt="Beer" />
        <img
          className="header-label"
          src={overlays[activeOverlay].src}
          alt="Label"
        />

        <div className="header-bottom">
          <button onClick={() => switchOverlay()} className="header-button">
            &gt;
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
