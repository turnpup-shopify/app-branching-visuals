import { useCallback, useMemo, useState } from "react";
import type { TreeDef, TreeNode } from "../types";

export type NavDirection = "in" | "out" | "none";

export function useTreeExplorer(tree: TreeDef) {
  const [path, setPath] = useState<TreeNode[]>([tree.root]);
  const [direction, setDirection] = useState<NavDirection>("none");

  const focus = path[path.length - 1];

  const goToChild = useCallback((child: TreeNode) => {
    setDirection("in");
    setPath((p) => [...p, child]);
  }, []);

  const goToPath = useCallback((nodes: TreeNode[]) => {
    setDirection("in");
    setPath((p) => [...p, ...nodes]);
  }, []);

  const goToAncestor = useCallback((index: number) => {
    setDirection("out");
    setPath((p) => p.slice(0, index + 1));
  }, []);

  const goUp = useCallback(() => {
    setDirection("out");
    setPath((p) => (p.length > 1 ? p.slice(0, -1) : p));
  }, []);

  const goHome = useCallback(() => {
    setDirection("out");
    setPath((p) => (p.length > 1 ? [p[0]] : p));
  }, []);

  const reset = useCallback((root: TreeNode) => {
    setDirection("none");
    setPath([root]);
  }, []);

  const canGoUp = path.length > 1;

  return useMemo(
    () => ({ path, focus, direction, goToChild, goToPath, goToAncestor, goUp, goHome, reset, canGoUp }),
    [path, focus, direction, goToChild, goToPath, goToAncestor, goUp, goHome, reset, canGoUp],
  );
}
