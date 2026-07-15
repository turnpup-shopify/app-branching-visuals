import { motion } from "framer-motion";
import type { TreeDef, TreeNode } from "../types";
import { applyOverride, flattenTree } from "../utils/treeUtils";

interface Props {
  trees: TreeDef[];
  overrides: Record<string, Partial<TreeNode>>;
  onUpdate: (nodeId: string, updates: Partial<TreeNode>) => void;
  onClose: () => void;
}

export function EditPanel({ trees, overrides, onUpdate, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-3 inset-y-3 z-30 flex flex-col overflow-hidden rounded-3xl glass-strong md:inset-x-auto md:left-1/2 md:inset-y-6 md:w-[min(92vw,640px)] md:-translate-x-1/2"
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
        <p className="text-sm font-semibold text-bone-50">Edit Content</p>
        <button
          onClick={onClose}
          className="rounded-full bg-signal-500/30 px-3 py-1.5 text-xs text-signal-300"
        >
          Done
        </button>
      </div>

      {/* Node list */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {trees.map((tree) => (
          <section key={tree.id}>
            <div className="sticky top-0 z-10 border-b border-white/5 bg-ink-900/80 px-5 py-2 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-bone-100/35">
                {tree.label}
              </p>
            </div>

            {flattenTree(tree.root).map(({ node, depth }) => {
              const live = applyOverride(node, overrides);
              const hasChildren = (node.children?.length ?? 0) > 0;
              const showDescription = hasChildren || live.description != null;

              return (
                <div
                  key={node.id}
                  className="flex flex-col gap-1.5 border-b border-white/5 py-3.5"
                  style={{ paddingLeft: `${20 + depth * 16}px`, paddingRight: "20px" }}
                >
                  {depth > 0 && (
                    <div
                      className="mb-0.5 h-px w-4 rounded-full bg-signal-400/25"
                      style={{ marginLeft: -10 }}
                    />
                  )}

                  <input
                    value={live.title}
                    onChange={(e) => onUpdate(node.id, { title: e.target.value })}
                    placeholder="Title"
                    className="w-full bg-transparent text-sm font-semibold text-bone-50 placeholder:text-bone-100/20 focus:outline-none"
                  />

                  <input
                    value={live.blurb ?? ""}
                    onChange={(e) => onUpdate(node.id, { blurb: e.target.value })}
                    placeholder="Short subtitle…"
                    className="w-full bg-transparent text-xs text-bone-100/45 placeholder:text-bone-100/15 focus:outline-none"
                  />

                  {showDescription && (
                    <textarea
                      value={live.description ?? ""}
                      onChange={(e) => onUpdate(node.id, { description: e.target.value })}
                      placeholder="Description…"
                      rows={live.description ? 3 : 1}
                      className="w-full resize-none bg-transparent text-xs leading-relaxed text-bone-100/35 placeholder:text-bone-100/15 focus:text-bone-100/65 focus:outline-none transition-colors"
                    />
                  )}
                </div>
              );
            })}
          </section>
        ))}

        <div className="h-8" />
      </div>
    </motion.div>
  );
}
