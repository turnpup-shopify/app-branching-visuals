import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, PencilOff } from "lucide-react";
import { Background } from "./components/Background";
import { TreeToggle } from "./components/TreeToggle";
import { Breadcrumb } from "./components/Breadcrumb";
import { ImmersiveCard } from "./components/ImmersiveCard";
import { EditPanel } from "./components/EditPanel";
import { trees } from "./data/trees";
import { useTreeExplorer } from "./hooks/useTreeExplorer";
import { applyOverride, applyOverrides } from "./utils/treeUtils";
import type { TreeDef, TreeNode } from "./types";

const OV_KEY = "bv-overrides";
const ADD_KEY = "bv-additions";

function load<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [activeTree, setActiveTree] = useState<TreeDef>(trees[0]);
  const [editMode, setEditMode] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, Partial<TreeNode>>>(() =>
    load(OV_KEY, {}),
  );
  const [additions, setAdditions] = useState<Record<string, TreeNode[]>>(() =>
    load(ADD_KEY, {}),
  );
  const explorer = useTreeExplorer(activeTree);

  const handleTreeChange = (tree: TreeDef) => {
    if (tree.id === activeTree.id) return;
    setActiveTree(tree);
    explorer.reset(tree.root);
  };

  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<TreeNode>) => {
    setOverrides((prev) => {
      const next = { ...prev, [nodeId]: { ...prev[nodeId], ...updates } };
      localStorage.setItem(OV_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const handleAddChild = useCallback((parentId: string) => {
    const newNode: TreeNode = {
      id: `node-${Date.now()}`,
      title: "",
      accent: "ink",
    };
    setAdditions((prev) => {
      const next = { ...prev, [parentId]: [...(prev[parentId] ?? []), newNode] };
      localStorage.setItem(ADD_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const livePath = explorer.path.map((n) => applyOverride(n, overrides));
  const liveNode = applyOverrides(explorer.focus, overrides, additions);

  return (
    <div className="relative flex h-dvh w-screen flex-col">
      <Background />

      <header className="z-20 flex w-full shrink-0 flex-col items-center gap-1.5 px-3 pt-3">
        <div className="flex items-center gap-2">
          <TreeToggle trees={trees} activeId={activeTree.id} onChange={handleTreeChange} />
          <button
            onClick={() => setEditMode((e) => !e)}
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs backdrop-blur-md transition-colors ${
              editMode
                ? "bg-signal-500/30 text-signal-300"
                : "bg-ink-900/30 text-bone-100/40 hover:text-bone-100/70"
            }`}
          >
            {editMode ? <PencilOff size={12} /> : <Pencil size={12} />}
            {editMode ? "Done" : "Edit"}
          </button>
        </div>
        <Breadcrumb path={livePath} onJump={(i) => explorer.goToAncestor(i)} />
      </header>

      <main className="relative min-h-0 w-full flex-1">
        <AnimatePresence mode="wait">
          {editMode ? (
            <EditPanel
              key="edit"
              trees={trees}
              overrides={overrides}
              additions={additions}
              onUpdate={handleUpdateNode}
              onAddChild={handleAddChild}
              onClose={() => setEditMode(false)}
            />
          ) : (
            <motion.div
              key="card"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <ImmersiveCard
                node={liveNode}
                direction={explorer.direction}
                canGoUp={explorer.canGoUp}
                onSelectChild={(child) => explorer.goToChild(child)}
                onGoUp={explorer.goUp}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
