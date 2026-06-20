import { motion } from "framer-motion";
import type { TreeDef } from "../types";

interface Props {
  trees: TreeDef[];
  activeId: string;
  onChange: (tree: TreeDef) => void;
}

export function TreeToggle({ trees, activeId, onChange }: Props) {
  return (
    <div className="glass flex gap-1 rounded-full p-1">
      {trees.map((tree) => {
        const active = tree.id === activeId;
        return (
          <button
            key={tree.id}
            onClick={() => onChange(tree)}
            className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active ? "text-ink-900" : "text-bone-100/70 hover:text-bone-50"
            }`}
          >
            {active && (
              <motion.span
                layoutId="toggle-pill"
                className="absolute inset-0 rounded-full bg-bone-50"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{tree.label}</span>
          </button>
        );
      })}
    </div>
  );
}
