import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Pencil, Check, X } from "lucide-react";
import type { TreeNode } from "../types";

interface Props {
  node: TreeNode | null;
  onClose: () => void;
  onUpdate?: (updates: Partial<TreeNode>) => void;
}

export function NodeSheet({ node, onClose, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setEditing(false);
  }, [node?.id]);

  return (
    <AnimatePresence>
      {node && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="glass-strong absolute inset-x-0 bottom-0 flex max-h-[80dvh] flex-col rounded-t-3xl md:left-1/2 md:w-[min(92vw,640px)] md:-translate-x-1/2"
          >
            <div className="flex shrink-0 justify-center pb-0.5 pt-3">
              <div className="h-1 w-8 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-3 px-5 pb-2 pt-3">
              <div className="min-w-0 flex-1">
                {editing ? (
                  <>
                    <input
                      value={node.title}
                      onChange={(e) => onUpdate?.({ title: e.target.value })}
                      className="w-full bg-transparent font-display text-xl font-semibold leading-tight text-bone-50 focus:outline-none"
                      placeholder="Title"
                    />
                    <input
                      value={node.blurb ?? ""}
                      onChange={(e) => onUpdate?.({ blurb: e.target.value })}
                      className="mt-0.5 w-full bg-transparent text-xs font-medium text-signal-400 placeholder:text-bone-100/25 focus:outline-none"
                      placeholder="Short subtitle…"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-xl font-semibold leading-tight text-bone-50">
                      {node.title}
                    </h2>
                    {node.blurb && (
                      <p className="mt-0.5 text-xs font-medium text-signal-400">{node.blurb}</p>
                    )}
                  </>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-1.5 mt-0.5">
                {onUpdate && (
                  <button
                    onClick={() => setEditing((e) => !e)}
                    className={`rounded-full p-1.5 transition-colors ${
                      editing
                        ? "bg-signal-500/30 text-signal-300"
                        : "bg-white/8 text-bone-100/50 hover:bg-white/12 hover:text-bone-50"
                    }`}
                  >
                    {editing ? <Check size={14} /> : <Pencil size={14} />}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="rounded-full bg-white/8 p-1.5 text-bone-100/50 transition-colors hover:bg-white/12 hover:text-bone-50"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-none px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {editing ? (
                <textarea
                  value={node.description ?? ""}
                  onChange={(e) => onUpdate?.({ description: e.target.value })}
                  placeholder="Description…"
                  rows={5}
                  className="w-full resize-none bg-transparent text-sm leading-relaxed text-bone-100/75 placeholder:text-bone-100/25 focus:outline-none"
                />
              ) : (
                <>
                  {node.description && (
                    <p className="mb-4 whitespace-pre-line text-sm leading-relaxed text-bone-100/75">
                      {node.description}
                    </p>
                  )}

                  {node.links?.length ? (
                    <div className="flex flex-col gap-2">
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

                  {!node.description && !node.links?.length && (
                    <p className="text-xs uppercase tracking-wide text-bone-100/30">No details yet</p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
