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

const OWNER = "turnpup-shopify";
const REPO = "app-branching-visuals";
const BRANCH = "claude/ikigai-vision-tree-explorer-vfuwso";
const FILE_PATHS: Record<string, string> = {
  ikigai: "src/data/ikigai.json",
  vision: "src/data/visionLayers.json",
  "love-list": "src/data/loveList.json",
};
const TOKEN_KEY = "bv-gh-token";

type SyncState = "idle" | "needs-token" | "syncing" | "done" | "error";

async function pushToGitHub(
  token: string,
  overrides: Record<string, Partial<TreeNode>>,
  additions: Record<string, TreeNode[]>,
  reorders: Record<string, string[]>,
) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  for (const path of Object.values(FILE_PATHS)) {
    // Always fetch the current file from GitHub as the base — never use the
    // local bundle, which may be older than what another device last synced.
    const meta = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`,
      { headers },
    ).then((r) => r.json() as Promise<{ sha: string; content: string }>);

    const raw = atob(meta.content.replace(/\n/g, ""));
    const bytes = Uint8Array.from(raw, (c) => c.charCodeAt(0));
    const base: TreeDef = JSON.parse(new TextDecoder().decode(bytes));
    const merged = { ...base, root: deepMerge(base.root, overrides, additions, reorders) };

    const body = JSON.stringify(merged, null, 2);
    const content = btoa(unescape(encodeURIComponent(body)));
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          message: "Sync content from in-app editor",
          content,
          sha: meta.sha,
          branch: BRANCH,
        }),
      },
    );
    if (!res.ok) throw new Error(`${res.status} on ${path}`);
  }
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
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [tokenInput, setTokenInput] = useState("");

  const handleSyncClick = () => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) {
      runSync(saved);
    } else {
      setSyncState("needs-token");
    }
  };

  const handleTokenSubmit = () => {
    const t = tokenInput.trim();
    if (!t) return;
    localStorage.setItem(TOKEN_KEY, t);
    setTokenInput("");
    runSync(t);
  };

  const runSync = (token: string) => {
    setSyncState("syncing");
    pushToGitHub(token, overrides, additions, reorders)
      .then(() => {
        setSyncState("done");
        // Keep bv-reorders: the new JSON has the order baked in after sync,
        // but the deploy takes ~2 min. Leaving reorders in localStorage ensures
        // the order stays correct in any new tab/reload during that window.
        ["bv-overrides", "bv-additions"].forEach((k) =>
          localStorage.removeItem(k),
        );
        setTimeout(() => setSyncState("idle"), 4000);
      })
      .catch(() => {
        setSyncState("error");
        setTimeout(() => setSyncState("idle"), 4000);
      });
  };

  const handleReset = () => {
    ["bv-overrides", "bv-additions", "bv-reorders"].forEach((k) =>
      localStorage.removeItem(k),
    );
    window.location.reload();
  };

  const syncLabel =
    syncState === "syncing"
      ? "Syncing…"
      : syncState === "done"
        ? "Synced ✓ — deploys in ~2 min"
        : syncState === "error"
          ? "Error — try again"
          : "Sync to source";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-3 inset-y-3 z-30 flex flex-col overflow-hidden rounded-3xl glass-panel md:inset-x-auto md:left-1/2 md:inset-y-6 md:w-[min(92vw,640px)] md:-translate-x-1/2"
    >
      <div className="flex shrink-0 flex-col border-b border-white/10 px-5 py-4 gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-bone-50">Edit Content</p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="rounded-full bg-bone-100/8 px-3 py-1.5 text-xs font-medium text-bone-100/40 hover:text-red-400/70 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSyncClick}
              disabled={syncState === "syncing"}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-60 ${
                syncState === "done"
                  ? "bg-signal-500/20 text-signal-300"
                  : syncState === "error"
                    ? "bg-red-500/20 text-red-300"
                    : "bg-bone-100/10 text-bone-100/60 hover:bg-bone-100/15 hover:text-bone-100/90"
              }`}
            >
              {syncLabel}
            </button>
            <button
              onClick={onClose}
              className="rounded-full bg-signal-500/30 px-3 py-1.5 text-xs font-medium text-signal-300"
            >
              Done
            </button>
          </div>
        </div>

        {syncState === "needs-token" && (
          <div className="flex items-center gap-2">
            <input
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTokenSubmit()}
              placeholder="GitHub token (repo scope)…"
              type="password"
              autoFocus
              className="min-w-0 flex-1 rounded-xl bg-white/8 px-3 py-2 text-xs text-bone-50 placeholder:text-bone-100/30 focus:outline-none focus:ring-1 focus:ring-signal-400/40"
            />
            <button
              onClick={handleTokenSubmit}
              className="shrink-0 rounded-xl bg-signal-500/30 px-3 py-2 text-xs font-medium text-signal-300"
            >
              Save & Sync
            </button>
          </div>
        )}
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
