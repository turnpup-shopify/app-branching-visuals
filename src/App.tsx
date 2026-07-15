import { useCallback, useState } from "react";
import { Pencil, PencilOff } from "lucide-react";
import { Background } from "./components/Background";
import { TreeToggle } from "./components/TreeToggle";
import { Breadcrumb } from "./components/Breadcrumb";
import { ImmersiveCard } from "./components/ImmersiveCard";
import { trees } from "./data/trees";
import { useTreeExplorer } from "./hooks/useTreeExplorer";
import type { TreeDef, TreeNode } from "./types";

const STORAGE_KEY = "bv-overrides";

function loadOverrides(): Record<string, Partial<TreeNode>> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function applyOverride(node: TreeNode, ov: Record<string, Partial<TreeNode>>): TreeNode {
  const patch = ov[node.id];
  return patch ? { ...node, ...patch } : node;
}

function applyOverrides(node: TreeNode, ov: Record<string, Partial<TreeNode>>): TreeNode {
  const live = applyOverride(node, ov);
  if (!live.children) return live;
  return { ...live, children: live.children.map((c) => applyOverride(c, ov)) };
}

function App() {
  const [activeTree, setActiveTree] = useState<TreeDef>(trees[0]);
  const [editMode, setEditMode] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, Partial<TreeNode>>>(loadOverrides);
  const explorer = useTreeExplorer(activeTree);

  const handleTreeChange = (tree: TreeDef) => {
    if (tree.id === activeTree.id) return;
    setActiveTree(tree);
    explorer.reset(tree.root);
  };

  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<TreeNode>) => {
    setOverrides((prev) => {
      const next = { ...prev, [nodeId]: { ...prev[nodeId], ...updates } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const livePath = explorer.path.map((n) => applyOverride(n, overrides));
  const liveNode = applyOverrides(explorer.focus, overrides);

  return (
    <div className="relative flex h-dvh w-screen flex-col">
      <Background />

      <header className="z-20 flex w-full shrink-0 flex-col items-center gap-3 px-3 pt-5">
        <div className="flex items-center gap-2">
          <TreeToggle trees={trees} activeId={activeTree.id} onChange={handleTreeChange} />
          <button
            onClick={() => setEditMode((e) => !e)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs backdrop-blur-md transition-colors ${
              editMode
                ? "bg-signal-500/30 text-signal-300"
                : "bg-ink-900/30 text-bone-100/40 hover:text-bone-100/70"
            }`}
          >
            {editMode ? <PencilOff size={13} /> : <Pencil size={13} />}
            {editMode ? "Done" : "Edit"}
          </button>
        </div>
        <Breadcrumb path={livePath} onJump={(i) => explorer.goToAncestor(i)} />
        <p className="text-center text-xs text-bone-100/35">{activeTree.tagline}</p>
      </header>

      <main className="relative min-h-0 w-full flex-1">
        <ImmersiveCard
          node={liveNode}
          direction={explorer.direction}
          canGoUp={explorer.canGoUp}
          onSelectChild={(child) => explorer.goToChild(child)}
          onGoUp={explorer.goUp}
          editMode={editMode}
          onUpdate={(updates) => handleUpdateNode(explorer.focus.id, updates)}
        />
      </main>
    </div>
  );
}

export default App;
