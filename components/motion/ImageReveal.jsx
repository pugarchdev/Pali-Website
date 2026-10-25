"use client";

import { motion } from "framer-motion";

export default function ImageReveal({
  children,
  className = "",
  delay = 0,
  duration = 1.0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`overflow-hidden relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
