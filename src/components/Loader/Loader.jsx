import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJedi } from "@fortawesome/free-solid-svg-icons";

const LoadingContainer = {
  margin: "1rem",
  width: "5rem",
  height: "0.5rem",
  display: "flex",
  justifyContent: "space-around",
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 0.35,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

const Loader = () => {
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span variants={DotVariants} transition={DotTransition}>
          <FontAwesomeIcon icon={faJedi} />
        </motion.span>
        <motion.span variants={DotVariants} transition={DotTransition}>
          <FontAwesomeIcon icon={faJedi} />
        </motion.span>
        <motion.span variants={DotVariants} transition={DotTransition}>
          <FontAwesomeIcon icon={faJedi} />
        </motion.span>
      </motion.div>
    </Box>
  );
};

export default Loader;
