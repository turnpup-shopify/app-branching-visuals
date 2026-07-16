import type { TreeDef, TreeNode } from "../types";

export function applyOverride(node: TreeNode, ov: Record<string, Partial<TreeNode>>): TreeNode {
  const patch = ov[node.id];
  return patch ? { ...node, ...patch } : node;
}

function reorderChildren(
  children: TreeNode[],
  parentId: string,
  reorders: Record<string, string[]>,
): TreeNode[] {
  const order = reorders[parentId];
  if (!order) return children;
  return [
    ...order.flatMap((id) => {
      const n = children.find((c) => c.id === id);
      return n ? [n] : [];
    }),
    ...children.filter((c) => !order.includes(c.id)),
  ];
}

export function applyOverrides(
  node: TreeNode,
  ov: Record<string, Partial<TreeNode>>,
  additions: Record<string, TreeNode[]> = {},
  reorders: Record<string, string[]> = {},
): TreeNode {
  const live = applyOverride(node, ov);
  const originalChildren = live.children ?? [];
  const addedChildren = additions[node.id] ?? [];
  const allChildren = [...originalChildren, ...addedChildren].map((c) => applyOverride(c, ov));
  const ordered = reorderChildren(allChildren, node.id, reorders);
  return ordered.length > 0 ? { ...live, children: ordered } : live;
}

export function deepMerge(
  node: TreeNode,
  ov: Record<string, Partial<TreeNode>>,
  additions: Record<string, TreeNode[]>,
  reorders: Record<string, string[]>,
): TreeNode {
  const live = applyOverride(node, ov);
  const originalChildren = live.children ?? [];
  const addedChildren = additions[node.id] ?? [];
  const allChildren = [...originalChildren, ...addedChildren].map((c) => applyOverride(c, ov));
  const ordered = reorderChildren(allChildren, node.id, reorders);
  if (ordered.length === 0) return live;
  return { ...live, children: ordered.map((c) => deepMerge(c, ov, additions, reorders)) };
}
