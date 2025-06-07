import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import React, { useCallback } from 'react';

const ParticlesContainer = () => {
  //  init
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <Particles
      className='w-full h-full absolute translate-z-0'
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: '',
          },
        },
        fpsLimit: 60, // Reducido de 120 para mejor performance
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 50, // Reducido de 90
            },
            repulse: {
              distance: 150, // Reducido de 200
              duration: 0.3, // Reducido de 0.4
            },
          },
        },
        particles: {
          color: {
            value: '#e68e2e',
          },
          links: {
            color: '#f5d393',
            distance: 120, // Reducido de 150
            enable: true,
            opacity: 0.4, // Reducido de 0.5
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            directions: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 0.8, // Reducido de 1
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000, // Aumentado de 800 para menos partículas
            },
            value: 60, // Reducido de 80
          },
          opacity: {
            value: 0.4, // Reducido de 0.5
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 4 }, // Reducido max de 5 a 4
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesContainer;