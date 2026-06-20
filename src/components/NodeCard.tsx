import { motion } from "framer-motion";
import { ImageIcon, Link2 } from "lucide-react";
import type { TreeNode } from "../types";

export type NodeRole = "focus" | "child" | "grandchild";

interface Props {
  node: TreeNode;
  role: NodeRole;
  onClick?: () => void;
  moreCount?: number;
}

const ROLE_STYLES: Record<NodeRole, string> = {
  focus: "glass-strong px-7 py-5 text-center min-w-[180px] max-w-[260px]",
  child: "glass px-5 py-3.5 min-w-[150px] max-w-[200px] cursor-pointer hover:scale-[1.04]",
  grandchild: "glass px-3 py-2 min-w-[110px] max-w-[150px] cursor-pointer opacity-80 hover:opacity-100 hover:scale-[1.05] text-xs",
};

const ACCENT_RING: Record<string, string> = {
  signal: "ring-2 ring-signal-400/70",
  ink: "ring-1 ring-ink-400/40",
  bone: "ring-1 ring-bone-200/30",
};

export function NodeCard({ node, role, onClick, moreCount }: Props) {
  const hasChildren = (node.children?.length ?? 0) > 0;
  const ring = ACCENT_RING[node.accent ?? (role === "focus" ? "signal" : "bone")];

  return (
    <motion.div
      onClick={onClick}
      whileTap={onClick ? { scale: 0.96 } : undefined}
      className={`relative select-none rounded-2xl transition-transform duration-200 ${ROLE_STYLES[role]} ${ring}`}
    >
      {moreCount ? (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-signal-500 px-1 text-[10px] font-semibold text-bone-50 shadow">
          +{moreCount}
        </span>
      ) : null}

      <div className="flex items-center justify-center gap-2">
        {node.image && <ImageIcon size={role === "focus" ? 16 : 13} className="text-bone-100/50" />}
        <h3
          className={
            role === "focus"
              ? "font-display text-lg font-semibold text-bone-50"
              : role === "child"
                ? "font-display text-[15px] font-semibold text-bone-50"
                : "font-medium text-bone-100/90"
          }
        >
          {node.title}
        </h3>
      </div>

      {node.blurb && role !== "grandchild" && (
        <p className={`mt-1 text-bone-100/60 ${role === "focus" ? "text-sm" : "text-xs"}`}>{node.blurb}</p>
      )}

      {role !== "grandchild" && (
        <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-bone-100/40">
          {hasChildren && <span>{node.children!.length} branch{node.children!.length > 1 ? "es" : ""}</span>}
          {node.links?.length ? (
            <span className="flex items-center gap-0.5">
              <Link2 size={11} /> {node.links.length}
            </span>
          ) : null}
        </div>
      )}
    </motion.div>
  );
}
