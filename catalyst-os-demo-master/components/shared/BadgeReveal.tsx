"use client";

import { motion } from "framer-motion";
import { BadgeIcon } from "./BadgeIcon";
import type { Badge } from "@/lib/mock-data";

export function BadgeReveal({ badge, index = 0 }: { badge: Badge; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.15 * index, type: "spring", stiffness: 260, damping: 18 }}
      className="flex flex-col items-center gap-2 text-center"
    >
      <BadgeIcon icon={badge.icon} size="lg" />
      <div>
        <p className="text-sm font-medium">{badge.name}</p>
        <p className="text-xs text-muted-foreground max-w-32">{badge.description}</p>
      </div>
    </motion.div>
  );
}
