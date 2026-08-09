import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Pencil, Check, Trash2, X, ChevronUp, ChevronDown, Plus } from "lucide-react";
import type { TreeNode } from "../types";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

interface Props {
  node: TreeNode | null;
  onClose: () => void;
  onUpdate?: (updates: Partial<TreeNode>) => void;
  forceEdit?: boolean;
  onAddChild?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export function NodeSheet({
  node,
  onClose,
  onUpdate,
  forceEdit,
  onAddChild,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: Props) {
  const [editing, setEditing] = useState(forceEdit ?? false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    setEditing(forceEdit ?? false);
  }, [node?.id, forceEdit]);

  return (
    <AnimatePresence>
      {node && (
        <>
          {/* Backdrop — mobile only */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          <motion.div
            key="sheet"
            initial={isDesktop ? { x: "100%" } : { y: "100%" }}
            animate={isDesktop ? { x: 0 } : { y: 0 }}
            exit={isDesktop ? { x: "100%" } : { y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="glass-strong absolute flex flex-col
              inset-x-0 bottom-0 max-h-[80dvh] rounded-t-3xl
              md:inset-x-auto md:inset-y-0 md:right-0 md:w-80 md:max-h-full md:rounded-l-3xl md:rounded-tr-none md:rounded-br-none md:border-l md:border-white/[0.07]"
          >
            {/* Drag handle — mobile only */}
            <div className="flex shrink-0 justify-center pb-0.5 pt-3 md:hidden">
              <div className="h-1 w-8 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-3 px-5 pb-2 pt-3 md:pt-5">
              <div className="min-w-0 flex-1">
                {editing ? (
                  <>
                    <input
                      value={node.title}
                      onChange={(e) => onUpdate?.({ title: e.target.value })}
                      className="w-full bg-transparent font-display text-xl font-semibold leading-tight text-bone-50 focus:outline-none"
                      placeholder="Title"
                      autoFocus
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

              <div className="mt-0.5 flex shrink-0 items-center gap-1.5">
                {/* Reorder arrows — only in edit mode when there are siblings to swap with */}
                {editing && (canMoveUp || canMoveDown) && (
                  <div className="flex flex-col">
                    <button
                      onClick={onMoveUp}
                      disabled={!canMoveUp}
                      className="p-0.5 text-bone-100/30 transition-colors hover:text-bone-100/70 disabled:opacity-0"
                    >
                      <ChevronUp size={13} />
                    </button>
                    <button
                      onClick={onMoveDown}
                      disabled={!canMoveDown}
                      className="p-0.5 text-bone-100/30 transition-colors hover:text-bone-100/70 disabled:opacity-0"
                    >
                      <ChevronDown size={13} />
                    </button>
                  </div>
                )}

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
                <>
                  <textarea
                    value={node.description ?? ""}
                    onChange={(e) => onUpdate?.({ description: e.target.value })}
                    placeholder="Description…"
                    rows={6}
                    className="w-full resize-none bg-transparent text-sm leading-relaxed text-bone-100/75 placeholder:text-bone-100/25 focus:outline-none"
                  />
                  <div className="mt-5 flex flex-col gap-3 border-t border-white/[0.06] pt-4">
                    {onAddChild && (
                      <button
                        onClick={onAddChild}
                        className="flex items-center gap-1.5 text-xs text-signal-400/60 transition-colors hover:text-signal-400"
                      >
                        <Plus size={12} />
                        Add child node
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onUpdate?.({ hidden: true });
                        onClose();
                      }}
                      className="flex items-center gap-1.5 text-xs text-red-400/60 transition-colors hover:text-red-400"
                    >
                      <Trash2 size={12} />
                      Delete node
                    </button>
                  </div>
                </>
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
                    <p className="text-xs uppercase tracking-wide text-bone-100/30">
                      No details yet
                    </p>
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
