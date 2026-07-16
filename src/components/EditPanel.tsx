import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import type { TreeDef, TreeNode } from "../types";
import { applyOverride, deepMerge } from "../utils/treeUtils";

interface Props {
  trees: TreeDef[];
  overrides: Record<string, Partial<TreeNode>>;
  additions: Record<string, TreeNode[]>;
  reorders: Record<string, string[]>;
  onUpdate: (nodeId: string, updates: Partial<TreeNode>) => void;
  onAddChild: (parentId: string) => void;
  onReorder: (parentId: string, orderedIds: string[]) => void;
  onClose: () => void;
}

export function EditPanel({
  trees,
  overrides,
  additions,
  reorders,
  onUpdate,
  onAddChild,
  onReorder,
  onClose,
}: Props) {
  const [syncLabel, setSyncLabel] = useState<"idle" | "copied">("idle");

  const handleSync = async () => {
    const merged = trees.map((tree) => ({
      ...tree,
      root: deepMerge(tree.root, overrides, additions, reorders),
    }));
    await navigator.clipboard.writeText(JSON.stringify(merged, null, 2));
    setSyncLabel("copied");
    setTimeout(() => setSyncLabel("idle"), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-3 inset-y-3 z-30 flex flex-col overflow-hidden rounded-3xl glass-strong md:inset-x-auto md:left-1/2 md:inset-y-6 md:w-[min(92vw,640px)] md:-translate-x-1/2"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
        <p className="text-sm font-semibold text-bone-50">Edit Content</p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSync}
            className="rounded-full bg-bone-100/10 px-3 py-1.5 text-xs font-medium text-bone-100/60 hover:bg-bone-100/15 hover:text-bone-100/90 transition-colors"
          >
            {syncLabel === "copied" ? "Copied! Paste in chat →" : "Sync to source"}
          </button>
          <button
            onClick={onClose}
            className="rounded-full bg-signal-500/30 px-3 py-1.5 text-xs font-medium text-signal-300"
          >
            Done
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none">
        {trees.map((tree) => (
          <section key={tree.id}>
            <div className="sticky top-0 z-10 border-b border-white/8 bg-ink-900/90 px-5 py-2.5 backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-widest text-signal-400/70">
                {tree.label}
              </p>
            </div>
            <NodeTree
              node={tree.root}
              depth={0}
              overrides={overrides}
              additions={additions}
              reorders={reorders}
              onUpdate={onUpdate}
              onAddChild={onAddChild}
              onReorder={onReorder}
              parentId={null}
              siblingIds={[]}
              index={0}
              siblingCount={1}
            />
          </section>
        ))}
        <div className="h-10" />
      </div>
    </motion.div>
  );
}

function NodeTree({
  node,
  depth,
  overrides,
  additions,
  reorders,
  onUpdate,
  onAddChild,
  onReorder,
  parentId,
  siblingIds,
  index,
  siblingCount,
}: {
  node: TreeNode;
  depth: number;
  overrides: Record<string, Partial<TreeNode>>;
  additions: Record<string, TreeNode[]>;
  reorders: Record<string, string[]>;
  onUpdate: (nodeId: string, updates: Partial<TreeNode>) => void;
  onAddChild: (parentId: string) => void;
  onReorder: (parentId: string, orderedIds: string[]) => void;
  parentId: string | null;
  siblingIds: string[];
  index: number;
  siblingCount: number;
}) {
  const live = applyOverride(node, overrides);
  const originalChildren = node.children ?? [];
  const addedChildren = additions[node.id] ?? [];
  const allChildren = [...originalChildren, ...addedChildren].map((c) => applyOverride(c, overrides));

  const order = reorders[node.id];
  const orderedChildren = order
    ? [
        ...order.flatMap((id) => {
          const found = allChildren.find((c) => c.id === id);
          return found ? [found] : [];
        }),
        ...allChildren.filter((c) => !order.includes(c.id)),
      ]
    : allChildren;

  const childIds = orderedChildren.map((c) => c.id);

  const swap = (a: number, b: number) => {
    if (!parentId) return;
    const next = [...siblingIds];
    [next[a], next[b]] = [next[b], next[a]];
    onReorder(parentId, next);
  };

  return (
    <>
      <NodeEditor
        node={live}
        depth={depth}
        canMoveUp={index > 0 && !!parentId}
        canMoveDown={index < siblingCount - 1 && !!parentId}
        onMoveUp={() => swap(index - 1, index)}
        onMoveDown={() => swap(index, index + 1)}
        onUpdate={(updates) => onUpdate(node.id, updates)}
        onAddChild={() => onAddChild(node.id)}
      />
      {orderedChildren.map((child, i) => (
        <NodeTree
          key={child.id}
          node={child}
          depth={depth + 1}
          overrides={overrides}
          additions={additions}
          reorders={reorders}
          onUpdate={onUpdate}
          onAddChild={onAddChild}
          onReorder={onReorder}
          parentId={node.id}
          siblingIds={childIds}
          index={i}
          siblingCount={orderedChildren.length}
        />
      ))}
    </>
  );
}

const BORDER_COLORS = [
  "",
  "border-l-2 border-signal-400/40",
  "border-l-2 border-signal-400/25",
  "border-l-2 border-bone-100/15",
];

function NodeEditor({
  node,
  depth,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onUpdate,
  onAddChild,
}: {
  node: TreeNode;
  depth: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onUpdate: (updates: Partial<TreeNode>) => void;
  onAddChild: () => void;
}) {
  const borderClass = BORDER_COLORS[Math.min(depth, BORDER_COLORS.length - 1)];

  return (
    <div
      className={`border-b border-white/6 py-3.5 ${borderClass}`}
      style={{ paddingLeft: 20 + depth * 18, paddingRight: 20 }}
    >
      {/* Title row with reorder arrows */}
      <div className="flex items-center gap-2">
        <input
          value={node.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Title"
          className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-bone-50 placeholder:text-bone-100/20 focus:outline-none"
        />
        {(canMoveUp || canMoveDown) && (
          <div className="flex shrink-0 flex-col">
            <button
              onClick={onMoveUp}
              disabled={!canMoveUp}
              className="p-0.5 text-bone-100/25 transition-colors hover:text-bone-100/70 disabled:opacity-0"
            >
              <ChevronUp size={13} />
            </button>
            <button
              onClick={onMoveDown}
              disabled={!canMoveDown}
              className="p-0.5 text-bone-100/25 transition-colors hover:text-bone-100/70 disabled:opacity-0"
            >
              <ChevronDown size={13} />
            </button>
          </div>
        )}
      </div>

      {/* Blurb */}
      <input
        value={node.blurb ?? ""}
        onChange={(e) => onUpdate({ blurb: e.target.value })}
        placeholder="Short subtitle…"
        className="mt-1.5 w-full bg-transparent text-sm text-bone-100/55 placeholder:text-bone-100/20 focus:text-bone-100/80 focus:outline-none transition-colors"
      />

      {/* Description */}
      {(node.description != null || depth <= 1) && (
        <textarea
          value={node.description ?? ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Description…"
          rows={node.description ? 3 : 1}
          className="mt-2 w-full resize-none bg-transparent text-sm leading-relaxed text-bone-100/50 placeholder:text-bone-100/18 focus:text-bone-100/75 focus:outline-none transition-colors"
        />
      )}

      {/* Add child */}
      <button
        onClick={onAddChild}
        className="mt-2 flex items-center gap-1 text-xs text-bone-100/28 transition-colors hover:text-signal-400/70"
      >
        <Plus size={11} />
        Add child
      </button>
    </div>
  );
}
