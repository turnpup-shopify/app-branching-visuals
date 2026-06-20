import { useState } from "react";
import { Background } from "./components/Background";
import { TreeToggle } from "./components/TreeToggle";
import { Breadcrumb } from "./components/Breadcrumb";
import { TreeCanvas } from "./components/TreeCanvas";
import { DetailPanel } from "./components/DetailPanel";
import { trees } from "./data/trees";
import { useTreeExplorer } from "./hooks/useTreeExplorer";
import type { TreeDef, TreeNode } from "./types";

function App() {
  const [activeTree, setActiveTree] = useState<TreeDef>(trees[0]);
  const explorer = useTreeExplorer(activeTree);
  const [panelNode, setPanelNode] = useState<TreeNode | null>(activeTree.root);

  const handleTreeChange = (tree: TreeDef) => {
    if (tree.id === activeTree.id) return;
    setActiveTree(tree);
    explorer.reset(tree.root);
    setPanelNode(tree.root);
  };

  const handleSelectChild = (child: TreeNode) => {
    explorer.goToChild(child);
    setPanelNode(child);
  };

  const handleSelectGrandchild = (child: TreeNode, grandchild: TreeNode) => {
    explorer.goToPath([child, grandchild]);
    setPanelNode(grandchild);
  };

  const handleSelectFocus = () => {
    const target = explorer.path[explorer.path.length - 2];
    explorer.goToAncestor(explorer.path.length - 2);
    setPanelNode(target ?? null);
  };

  const handleBreadcrumbJump = (index: number) => {
    explorer.goToAncestor(index);
    setPanelNode(explorer.path[index]);
  };

  return (
    <div className="relative h-screen w-screen">
      <Background />

      <header className="pointer-events-none absolute left-1/2 top-5 z-20 flex w-[min(94vw,720px)] -translate-x-1/2 flex-col items-center gap-3">
        <div className="pointer-events-auto">
          <TreeToggle trees={trees} activeId={activeTree.id} onChange={handleTreeChange} />
        </div>
        <div className="pointer-events-auto">
          <Breadcrumb path={explorer.path} onJump={handleBreadcrumbJump} />
        </div>
        <p className="text-xs text-bone-100/35">{activeTree.tagline}</p>
      </header>

      <main className="h-full w-full">
        <TreeCanvas
          focus={explorer.focus}
          direction={explorer.direction}
          onSelectChild={handleSelectChild}
          onSelectGrandchild={handleSelectGrandchild}
          onSelectFocus={handleSelectFocus}
          canGoUp={explorer.canGoUp}
        />
      </main>

      <DetailPanel node={panelNode} onClose={() => setPanelNode(null)} />
    </div>
  );
}

export default App;
