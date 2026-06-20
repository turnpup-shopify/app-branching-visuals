import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { TreeNode } from "../types";

interface Props {
  node: TreeNode | null;
  onClose: () => void;
}

export function DetailPanel({ node, onClose }: Props) {
  return (
    <AnimatePresence>
      {node && (
        <motion.aside
          key={node.id}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong absolute inset-x-3 bottom-3 top-auto z-20 max-h-[60vh] overflow-y-auto rounded-3xl p-6 scrollbar-none md:inset-x-auto md:left-auto md:right-4 md:top-4 md:bottom-4 md:max-h-none md:w-[min(90vw,360px)]"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-bone-100/60 hover:bg-white/10 hover:text-bone-50"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {node.image && (
            <img
              src={node.image}
              alt={node.title}
              className="mb-4 h-36 w-full rounded-2xl object-cover"
            />
          )}

          <h2 className="font-display pr-8 text-xl font-semibold text-bone-50">{node.title}</h2>
          {node.blurb && <p className="mt-1 text-sm font-medium text-signal-400">{node.blurb}</p>}

          {node.description && (
            <p className="mt-4 text-sm leading-relaxed text-bone-100/75">{node.description}</p>
          )}

          {node.links?.length ? (
            <div className="mt-5 flex flex-col gap-2">
              {node.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glass flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-bone-50 transition-colors hover:bg-white/15"
                >
                  {link.label}
                  <ArrowUpRight size={14} className="text-bone-100/50" />
                </a>
              ))}
            </div>
          ) : null}

          {node.children?.length ? (
            <p className="mt-5 text-xs uppercase tracking-wide text-bone-100/40">
              {node.children.length} branch{node.children.length > 1 ? "es" : ""} — tap a node to explore
            </p>
          ) : (
            <p className="mt-5 text-xs uppercase tracking-wide text-bone-100/40">End of this branch</p>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
