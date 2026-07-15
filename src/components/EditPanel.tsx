import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { TreeDef, TreeNode } from "../types";
import { applyOverride } from "../utils/treeUtils";

interface Props {
  trees: TreeDef[];
  overrides: Record<string, Partial<TreeNode>>;
  additions: Record<string, TreeNode[]>;
  onUpdate: (nodeId: string, updates: Partial<TreeNode>) => void;
  onAddChild: (parentId: string) => void;
  onClose: () => void;
}

export function EditPanel({ trees, overrides, additions, onUpdate, onAddChild, onClose }: Props) {
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
          className="rounded-full bg-signal-500/30 px-3 py-1.5 text-xs font-medium text-signal-300"
        >
          Done
        </button>
      </div>

      {/* Scrollable node list */}
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
              onUpdate={onUpdate}
              onAddChild={onAddChild}
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
  onUpdate,
  onAddChild,
}: {
  node: TreeNode;
  depth: number;
  overrides: Record<string, Partial<TreeNode>>;
  additions: Record<string, TreeNode[]>;
  onUpdate: (nodeId: string, updates: Partial<TreeNode>) => void;
  onAddChild: (parentId: string) => void;
}) {
  const live = applyOverride(node, overrides);
  const addedChildren = additions[node.id] ?? [];
  const allChildren = [...(node.children ?? []), ...addedChildren];

  return (
    <>
      <NodeEditor
        node={live}
        depth={depth}
        onUpdate={(updates) => onUpdate(node.id, updates)}
        onAddChild={() => onAddChild(node.id)}
      />
      {allChildren.map((child) => (
        <NodeTree
          key={child.id}
          node={child}
          depth={depth + 1}
          overrides={overrides}
          additions={additions}
          onUpdate={onUpdate}
          onAddChild={onAddChild}
        />
      ))}
    </>
  );
}

const DEPTH_COLORS = [
  "border-signal-400/0",
  "border-signal-400/40",
  "border-signal-400/25",
  "border-bone-100/15",
];

function NodeEditor({
  node,
  depth,
  onUpdate,
  onAddChild,
}: {
  node: TreeNode;
  depth: number;
  onUpdate: (updates: Partial<TreeNode>) => void;
  onAddChild: () => void;
}) {
  const leftPad = 20 + depth * 18;
  const borderColor = DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)];

  return (
    <div
      className={`relative border-b border-white/6 py-4 ${depth > 0 ? `border-l-2 ${borderColor}` : ""}`}
      style={{ paddingLeft: leftPad, paddingRight: 20 }}
    >
      {/* Title */}
      <input
        value={node.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        placeholder="Title"
        className="mb-1.5 w-full bg-transparent text-[15px] font-semibold text-bone-50 placeholder:text-bone-100/20 focus:outline-none"
      />

      {/* Blurb */}
      <input
        value={node.blurb ?? ""}
        onChange={(e) => onUpdate({ blurb: e.target.value })}
        placeholder="Short subtitle…"
        className="mb-2 w-full bg-transparent text-sm text-bone-100/55 placeholder:text-bone-100/20 focus:outline-none focus:text-bone-100/80 transition-colors"
      />

      {/* Description — show when parent or already has content */}
      {(node.description != null || depth <= 1) && (
        <textarea
          value={node.description ?? ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Description…"
          rows={node.description ? 3 : 1}
          className="mb-2 w-full resize-none bg-transparent text-sm leading-relaxed text-bone-100/50 placeholder:text-bone-100/18 focus:text-bone-100/75 focus:outline-none transition-colors"
        />
      )}

      {/* Add child */}
      <button
        onClick={onAddChild}
        className="mt-0.5 flex items-center gap-1 text-xs text-bone-100/30 hover:text-signal-400/70 transition-colors"
      >
        <Plus size={11} />
        Add child
      </button>
    </div>
  );
}
