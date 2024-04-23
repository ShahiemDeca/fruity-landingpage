import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FloatingParticles = ({ particles }) => {
  const particlesRef = useRef([]);

  const particlesGroup = [
    {
      src: particles[1],
      style: { rotate: "-100deg" },
    },
    {
      src: particles[1],
      style: { bottom: "10%", rotate: "50deg" },
    },
    {
      src: particles[0],
      style: { top: "0", left: "40%", rotate: "-50deg" },
    },
    {
      src: particles[0],
      style: { bottom: "10%", left: "50%", rotate: "50deg" },
    },
    {
      src: particles[1],
      style: { right: "0", rotate: "-50deg" },
    },
    {
      src: particles[1],
      style: { right: "0", bottom: "0", rotate: "50deg" },
    },
  ];

  const floatParticles = () => {
    const particles = particlesRef.current;
    particles.forEach((particle, index) => {
      const duration = gsap.utils.random(2, 3);

      gsap.set(particle, { transformOrigin: "center" });
      gsap.to(particle, { duration: 0.2, ease: "power3.inOut" });
      gsap.to(particle, {
        x: "+=100",
        y: "-=100",
        repeat: -1,
        yoyo: true, // Reverse animation
        duration: duration,
        delay: index * 0.2,
        ease: "sine.inOut",
      });
    });
  };

  useEffect(() => {
    floatParticles();

    return () => {
      gsap.killTweensOf(".particle");
    };
  }, []);

  return (
    <div className="particles">
      {particlesGroup.map((particle, index) => (
        <img
          key={index}
          ref={(el) => (particlesRef.current[index] = el)}
          src={particle.src}
          className="particles-object"
          style={{
            ...particle.style,
            transform: `rotate(${particle.rotate})`,
          }}
          alt="Particle"
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
