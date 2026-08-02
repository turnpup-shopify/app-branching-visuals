import { useState } from "react";
import { ChevronRight, Minus, Plus } from "lucide-react";
import type { TreeNode } from "../types";

interface Props {
  root: TreeNode;
  onSelectNode: (node: TreeNode) => void;
  selectedId?: string;
  editMode?: boolean;
  onDeleteNode?: (id: string) => void;
  onAddSibling?: (parentId: string) => void;
}

export function TreeView({ root, onSelectNode, selectedId, editMode, onDeleteNode, onAddSibling }: Props) {
  const visibleTopChildren = (root.children ?? []).filter((c) => !c.hidden);

  return (
    <div className="h-full overflow-y-auto scrollbar-none">
      <div className="flex flex-col gap-1.5 px-3 pt-2 pb-10 md:mx-auto md:w-[min(92vw,640px)]">
        <div className="px-1 pb-1 pt-0.5">
          <h1 className="font-display text-2xl font-bold leading-tight text-bone-50">{root.title}</h1>
          {root.blurb && <p className="mt-0.5 text-xs font-medium text-signal-400">{root.blurb}</p>}
        </div>

        {visibleTopChildren.map((child) => (
          <TopBranch
            key={child.id}
            node={child}
            onSelect={onSelectNode}
            selectedId={selectedId}
            parentId={root.id}
            editMode={editMode}
            onDeleteNode={onDeleteNode}
            onAddSibling={onAddSibling}
          />
        ))}
      </div>
    </div>
  );
}

function TopBranch({
  node,
  onSelect,
  selectedId,
  parentId,
  editMode,
  onDeleteNode,
  onAddSibling,
}: {
  node: TreeNode;
  onSelect: (n: TreeNode) => void;
  selectedId?: string;
  parentId: string;
  editMode?: boolean;
  onDeleteNode?: (id: string) => void;
  onAddSibling?: (parentId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const visibleChildren = (node.children ?? []).filter((c) => !c.hidden);
  const hasChildren = visibleChildren.length > 0;
  const hasContent = !!(node.description || node.links?.length);
  const isSelected = node.id === selectedId;

  return (
    <div
      className={`overflow-hidden rounded-2xl glass transition-shadow ${isSelected ? "ring-1 ring-signal-400/30" : ""}`}
    >
      <div className="flex items-center">
        <button
          className="min-w-0 flex-1 px-4 py-3 text-left"
          onClick={() => {
            if (hasContent || !hasChildren) onSelect(node);
            if (hasChildren) setOpen((o) => !o);
          }}
        >
          <span className="block text-[15px] font-semibold leading-snug text-bone-50">{node.title}</span>
          {node.blurb && (
            <span className="mt-0.5 block text-xs leading-snug text-bone-100/50">{node.blurb}</span>
          )}
        </button>
        {editMode && (
          <div className="flex shrink-0 items-center gap-1 pr-2">
            <button
              onClick={(e) => { e.stopPropagation(); onDeleteNode?.(node.id); }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/15 text-red-400/70 transition-colors hover:bg-red-500/25 hover:text-red-400"
              aria-label="Delete node"
            >
              <Minus size={11} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onAddSibling?.(parentId); }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-signal-500/15 text-signal-400/70 transition-colors hover:bg-signal-500/25 hover:text-signal-400"
              aria-label="Add sibling"
            >
              <Plus size={11} />
            </button>
          </div>
        )}
        {hasChildren && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="shrink-0 px-3.5 py-3 text-bone-100/30 transition-colors hover:text-bone-100/60"
            aria-label={open ? "Collapse" : "Expand"}
          >
            <ChevronRight
              size={15}
              className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            />
          </button>
        )}
      </div>

      {hasChildren && open && (
        <div className="flex flex-col border-t border-white/[0.06] px-3 py-2">
          {visibleChildren.map((child, i) => (
            <SubBranch
              key={child.id}
              node={child}
              isLast={i === visibleChildren.length - 1}
              depth={1}
              onSelect={onSelect}
              selectedId={selectedId}
              parentId={node.id}
              editMode={editMode}
              onDeleteNode={onDeleteNode}
              onAddSibling={onAddSibling}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SubBranch({
  node,
  isLast,
  depth,
  onSelect,
  selectedId,
  parentId,
  editMode,
  onDeleteNode,
  onAddSibling,
}: {
  node: TreeNode;
  isLast: boolean;
  depth: number;
  onSelect: (n: TreeNode) => void;
  selectedId?: string;
  parentId: string;
  editMode?: boolean;
  onDeleteNode?: (id: string) => void;
  onAddSibling?: (parentId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const visibleChildren = (node.children ?? []).filter((c) => !c.hidden);
  const hasChildren = visibleChildren.length > 0;
  const hasContent = !!(node.description || node.links?.length);
  const isSelected = node.id === selectedId;

  return (
    <div className="relative pl-5 pb-0.5">
      {!isLast && <div className="absolute left-0 top-4 bottom-0 w-px bg-white/[0.08]" />}
      <div className="absolute left-0 top-4 h-px w-5 bg-white/[0.08]" />

      <div className={`flex items-center rounded-xl transition-colors ${isSelected ? "bg-signal-500/10" : ""}`}>
        <button
          className="min-w-0 flex-1 px-2.5 py-2 text-left"
          onClick={() => {
            if (hasContent || !hasChildren) onSelect(node);
            if (hasChildren) setOpen((o) => !o);
          }}
        >
          <span className="block text-sm font-semibold leading-snug text-bone-50">{node.title}</span>
          {node.blurb && (
            <span className="mt-0.5 block text-xs leading-snug text-bone-100/45">{node.blurb}</span>
          )}
        </button>
        {editMode && (
          <div className="flex shrink-0 items-center gap-1 pr-1">
            <button
              onClick={(e) => { e.stopPropagation(); onDeleteNode?.(node.id); }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/15 text-red-400/70 transition-colors hover:bg-red-500/25 hover:text-red-400"
              aria-label="Delete node"
            >
              <Minus size={9} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onAddSibling?.(parentId); }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-signal-500/15 text-signal-400/70 transition-colors hover:bg-signal-500/25 hover:text-signal-400"
              aria-label="Add sibling"
            >
              <Plus size={9} />
            </button>
          </div>
        )}
        {hasChildren && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="shrink-0 px-2.5 py-2 text-bone-100/25 transition-colors hover:text-bone-100/60"
          >
            <ChevronRight
              size={13}
              className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            />
          </button>
        )}
      </div>

      {hasChildren && open && (
        <div className="flex flex-col">
          {visibleChildren.map((child, i) => (
            <SubBranch
              key={child.id}
              node={child}
              isLast={i === visibleChildren.length - 1}
              depth={depth + 1}
              onSelect={onSelect}
              selectedId={selectedId}
              parentId={node.id}
              editMode={editMode}
              onDeleteNode={onDeleteNode}
              onAddSibling={onAddSibling}
            />
          ))}
        </div>
      )}
    </div>
  );
}
