import { useState } from "react";
import { Background } from "./components/Background";
import { TreeToggle } from "./components/TreeToggle";
import { Breadcrumb } from "./components/Breadcrumb";
import { ImmersiveCard } from "./components/ImmersiveCard";
import { trees } from "./data/trees";
import { useTreeExplorer } from "./hooks/useTreeExplorer";
import type { TreeDef, TreeNode } from "./types";

function App() {
  const [activeTree, setActiveTree] = useState<TreeDef>(trees[0]);
  const explorer = useTreeExplorer(activeTree);

  const handleTreeChange = (tree: TreeDef) => {
    if (tree.id === activeTree.id) return;
    setActiveTree(tree);
    explorer.reset(tree.root);
  };

  const handleSelectChild = (child: TreeNode) => {
    explorer.goToChild(child);
  };

  const handleBreadcrumbJump = (index: number) => {
    explorer.goToAncestor(index);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col">
      <Background />

      <header className="z-20 flex w-full shrink-0 flex-col items-center gap-3 px-3 pt-5">
        <TreeToggle trees={trees} activeId={activeTree.id} onChange={handleTreeChange} />
        <Breadcrumb path={explorer.path} onJump={handleBreadcrumbJump} />
        <p className="text-center text-xs text-bone-100/35">{activeTree.tagline}</p>
      </header>

      <main className="relative min-h-0 w-full flex-1">
        <ImmersiveCard
          node={explorer.focus}
          direction={explorer.direction}
          canGoUp={explorer.canGoUp}
          onSelectChild={handleSelectChild}
          onGoUp={explorer.goUp}
        />
      </main>
    </div>
  );
}

export default App;
