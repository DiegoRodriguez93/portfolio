// framer motion
import { motion } from "framer-motion";

// variants optimizados para evitar layout shifts
const transitionVariants = {
  initial: {
    x: "100%",
    width: "100%",
    rotate: 0,
    scale: 1,
    opacity: 1,
  },
  animate: {
    x: "0%",
    width: "0%",
    rotate: [0, 5, -5, 0],
    scale: [1, 1.02, 0.98, 1],
    opacity: [1, 1, 1, 0],
  },
  exit: {
    x: ["0%", "100%"],
    width: ["0%", "100%"],
    rotate: [0, -10, 10, 0],
    scale: [1, 0.95, 1.05, 1],
    opacity: 1,
  },
};

// Variante para el texto optimizada
const textVariants = {
  initial: {
    opacity: 1,
    x: 0,
  },
  animate: {
    opacity: [1, 1, 0],
    x: [0, 0, -100],
  },
  exit: {
    opacity: 1,
    x: 0,
  },
};

const Transition = () => {
  return (
    <motion.div
      className="fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-[#1b1435] origin-center flex items-center justify-center overflow-hidden"
      variants={transitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        delay: 0.2, // Reducido de 0.5
        duration: 0.8, // Reducido de 1.0
        ease: [0.25, 0.46, 0.45, 0.94],
        x: { type: "spring", damping: 12, stiffness: 160 }, // Más rápido
        opacity: { duration: 0.2, delay: 0.6 },
      }}
      // Evitar layout shift con dimensiones fijas
      style={{
        willChange: 'transform, opacity',
        contain: 'layout style paint',
      }}
    >
      <motion.h1
        className="text-white text-2xl md:text-4xl font-bold tracking-wide"
        variants={textVariants}
        transition={{
          duration: 0.4, // Reducido
          delay: 0.3, // Reducido
          opacity: { duration: 0.2, delay: 0.6 },
        }}
        style={{
          willChange: 'transform, opacity',
        }}
      >
        Loading...
      </motion.h1>
    </motion.div>
  );
};

export default Transition;