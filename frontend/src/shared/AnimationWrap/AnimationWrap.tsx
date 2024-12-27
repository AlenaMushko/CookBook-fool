import { motion } from "framer-motion";
import React, { memo } from "react";

interface Props {
  children?: React.ReactNode;
  duration?: number;
}
const AnimationWrap: React.FC<Props> = ({ children, duration = 0.4 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration, ease: "easeIn" }}
    >
      {children}
    </motion.div>
  );
};

export default memo(AnimationWrap);
