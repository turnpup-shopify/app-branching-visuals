import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";
import type { NavDirection } from "../hooks/useTreeExplorer";
import type { NodeAccent, TreeNode } from "../types";

interface Props {
  node: TreeNode;
  direction: NavDirection;
  canGoUp: boolean;
  onSelectChild: (child: TreeNode) => void;
  onGoUp: () => void;
}

const ACCENT_HERO: Record<NodeAccent, string> = {
  signal: "from-signal-600/50 via-ink-800/60 to-ink-900",
  ink: "from-ink-500/60 via-ink-800/70 to-ink-900",
  bone: "from-bone-200/20 via-ink-800/70 to-ink-900",
};

const cardVariants: Variants = {
  enter: (direction: NavDirection) => ({
    opacity: 0,
    x: direction === "in" ? 64 : direction === "out" ? -64 : 0,
    scale: 0.97,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: NavDirection) => ({
    opacity: 0,
    x: direction === "in" ? -64 : direction === "out" ? 64 : 0,
    scale: 0.97,
    transition: { duration: 0.24, ease: [0.7, 0, 0.84, 0] },
  }),
};

export function ImmersiveCard({ node, direction, canGoUp, onSelectChild, onGoUp }: Props) {
  const accent = node.accent ?? "signal";
  const children = node.children ?? [];

  return (
    <div className="absolute inset-x-3 inset-y-3 md:inset-x-auto md:left-1/2 md:inset-y-6 md:w-[min(92vw,640px)] md:-translate-x-1/2">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={node.id}
          custom={direction}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="glass-strong absolute inset-0 flex flex-col overflow-y-auto rounded-3xl scrollbar-none"
        >
          <div className={`relative shrink-0 bg-gradient-to-b ${ACCENT_HERO[accent]}`}>
            {node.image && (
              <img
                src={node.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent" />

            {canGoUp && (
              <button
                onClick={onGoUp}
                className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-ink-900/40 px-3 py-1.5 text-sm text-bone-50 backdrop-blur-md hover:bg-ink-900/60"
                aria-label="Go back"
              >
                <ArrowLeft size={15} />
                Back
              </button>
            )}

            <div className="relative flex min-h-[7rem] flex-col items-start justify-end gap-1 p-4 pt-10">
              {!node.image && <Sparkles size={15} className="mb-0.5 text-signal-400" />}
              <h1 className="font-display text-xl font-semibold leading-tight text-bone-50 md:text-2xl">
                {node.title}
              </h1>
              {node.blurb && <p className="text-xs font-medium text-signal-400">{node.blurb}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-4 p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            {node.description && (
              <p className="whitespace-pre-line text-sm leading-relaxed text-bone-100/75">
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

            {children.length > 0 ? (
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-wide text-bone-100/40">
                  Explore further
                </p>
                {children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => onSelectChild(child)}
                    className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors hover:bg-white/15"
                  >
                    <span>
                      <span className="font-display block text-[15px] font-semibold text-bone-50">
                        {child.title}
                      </span>
                      {child.blurb && (
                        <span className="block text-xs text-bone-100/55">{child.blurb}</span>
                      )}
                    </span>
                    <ChevronRight size={16} className="shrink-0 text-bone-100/40" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs uppercase tracking-wide text-bone-100/40">
                End of this branch
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
