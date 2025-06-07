// framer motion
import { motion } from "framer-motion";

// variants
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
    opacity: [1, 1, 1, 0], // Se desvanece al final
  },
  exit: {
    x: ["0%", "100%"],
    width: ["0%", "100%"],
    rotate: [0, -10, 10, 0],
    scale: [1, 0.95, 1.05, 1],
    opacity: 1,
  },
};

// Variante para el texto
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
        delay: 0.5,
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
        x: { type: "spring", damping: 10, stiffness: 140 },
        opacity: { duration: 0.3, delay: 0.7 }, // Controla cuándo se oculta
      }}
    >
      <motion.h1
        className="text-white text-2xl md:text-4xl font-bold tracking-wide"
        variants={textVariants}
        transition={{
          duration: 0.6,
          delay: 0.5,
          opacity: { duration: 0.3, delay: 0.8 }, // Se oculta un poco después
        }}
      >
        Loading...
      </motion.h1>
    </motion.div>
  );
};

export default Transition;