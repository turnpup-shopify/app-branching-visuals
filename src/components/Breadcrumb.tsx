import { ChevronRight, Home } from "lucide-react";
import type { TreeNode } from "../types";

interface Props {
  path: TreeNode[];
  onJump: (index: number) => void;
}

export function Breadcrumb({ path, onJump }: Props) {
  if (path.length <= 1) return null;

  return (
    <div className="glass flex max-w-[min(70vw,640px)] items-center gap-1 overflow-x-auto rounded-full px-3 py-1.5 text-sm scrollbar-none">
      <button
        onClick={() => onJump(0)}
        className="flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-bone-100/70 hover:text-bone-50"
      >
        <Home size={14} />
      </button>
      {path.map((node, i) => {
        const isLast = i === path.length - 1;
        if (i === 0) return null;
        return (
          <span key={node.id} className="flex shrink-0 items-center gap-1">
            <ChevronRight size={13} className="text-bone-100/30" />
            <button
              onClick={() => onJump(i)}
              disabled={isLast}
              className={`whitespace-nowrap rounded-full px-2 py-1 ${
                isLast ? "text-signal-400 font-medium" : "text-bone-100/70 hover:text-bone-50"
              }`}
            >
              {node.title}
            </button>
          </span>
        );
      })}
    </div>
  );
}
