import type { TreeNode } from "../types";

export function applyOverride(node: TreeNode, ov: Record<string, Partial<TreeNode>>): TreeNode {
  const patch = ov[node.id];
  return patch ? { ...node, ...patch } : node;
}

export function applyOverrides(
  node: TreeNode,
  ov: Record<string, Partial<TreeNode>>,
  additions: Record<string, TreeNode[]> = {},
): TreeNode {
  const live = applyOverride(node, ov);
  const originalChildren = live.children ?? [];
  const addedChildren = additions[node.id] ?? [];
  const allChildren = [...originalChildren, ...addedChildren].map((c) => applyOverride(c, ov));
  return allChildren.length > 0 ? { ...live, children: allChildren } : live;
}
