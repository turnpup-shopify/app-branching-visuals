import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Pencil, PencilOff, UploadCloud } from "lucide-react";
import { Background } from "./components/Background";
import { TreeToggle } from "./components/TreeToggle";
import { TreeView } from "./components/TreeView";
import { NodeSheet } from "./components/NodeSheet";
import { EditPanel } from "./components/EditPanel";
import { trees } from "./data/trees";
import { deepMerge } from "./utils/treeUtils";
import type { TreeDef, TreeNode } from "./types";

const OV_KEY = "bv-overrides";
const ADD_KEY = "bv-additions";
const REORDER_KEY = "bv-reorders";

function load<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function findNode(root: TreeNode, id: string): TreeNode | null {
  if (root.id === id) return root;
  for (const child of root.children ?? []) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

function App() {
  const [activeTree, setActiveTree] = useState<TreeDef>(trees[0]);
  const [editMode, setEditMode] = useState(false);
  const [syncOpen, setSyncOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Record<string, Partial<TreeNode>>>(() =>
    load(OV_KEY, {}),
  );
  const [additions, setAdditions] = useState<Record<string, TreeNode[]>>(() =>
    load(ADD_KEY, {}),
  );
  const [reorders, setReorders] = useState<Record<string, string[]>>(() =>
    load(REORDER_KEY, {}),
  );

  const handleTreeChange = (tree: TreeDef) => {
    if (tree.id === activeTree.id) return;
    setActiveTree(tree);
    setSelectedNodeId(null);
  };

  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<TreeNode>) => {
    setOverrides((prev) => {
      const next = { ...prev, [nodeId]: { ...prev[nodeId], ...updates } };
      localStorage.setItem(OV_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const handleReorder = useCallback((parentId: string, orderedIds: string[]) => {
    setReorders((prev) => {
      const next = { ...prev, [parentId]: orderedIds };
      localStorage.setItem(REORDER_KEY, JSON.stringify(next));
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

  const handleDeleteNode = useCallback((nodeId: string) => {
    handleUpdateNode(nodeId, { hidden: true });
    setSelectedNodeId((prev) => (prev === nodeId ? null : prev));
  }, [handleUpdateNode]);

  const mergedRoot = deepMerge(activeTree.root, overrides, additions, reorders);
  const selectedNode = selectedNodeId ? findNode(mergedRoot, selectedNodeId) : null;

  return (
    <div className="relative flex h-dvh w-screen flex-col">
      <Background />

      <header className="z-20 flex w-full shrink-0 items-center gap-2 px-3 pb-1.5 pt-3">
        <TreeToggle trees={trees} activeId={activeTree.id} onChange={handleTreeChange} />
        {editMode ? (
          <>
            <button
              onClick={() => setSyncOpen(true)}
              className="flex items-center gap-1 rounded-full bg-ink-900/30 px-2.5 py-1 text-xs text-bone-100/40 backdrop-blur-md transition-colors hover:text-bone-100/70"
            >
              <UploadCloud size={12} />
              Sync
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="flex items-center gap-1 rounded-full bg-signal-500/30 px-2.5 py-1 text-xs text-signal-300 backdrop-blur-md"
            >
              <PencilOff size={12} />
              Done
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-1 rounded-full bg-ink-900/30 px-2.5 py-1 text-xs text-bone-100/40 backdrop-blur-md transition-colors hover:text-bone-100/70"
          >
            <Pencil size={12} />
            Edit
          </button>
        )}
      </header>

      <main className="relative min-h-0 w-full flex-1">
        <TreeView
          root={mergedRoot}
          onSelectNode={(node) => setSelectedNodeId(node.id)}
          selectedId={selectedNodeId ?? undefined}
          editMode={editMode}
          onDeleteNode={handleDeleteNode}
          onAddSibling={(parentId) => handleAddChild(parentId)}
        />
        {!editMode && (
          <NodeSheet
            node={selectedNode}
            onUpdate={(updates) => selectedNodeId && handleUpdateNode(selectedNodeId, updates)}
            onClose={() => setSelectedNodeId(null)}
          />
        )}

        <AnimatePresence>
          {syncOpen && (
            <EditPanel
              key="edit"
              trees={trees}
              overrides={overrides}
              additions={additions}
              reorders={reorders}
              onUpdate={handleUpdateNode}
              onAddChild={handleAddChild}
              onReorder={handleReorder}
              onClose={() => setSyncOpen(false)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
