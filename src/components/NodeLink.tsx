import React from "react";
import { useNode } from "../hooks/useNode";

interface NodeLinkProps {
  path: string;
  /** Custom label. Defaults to the node's display name or last path segment. */
  label?: string;
  /** Called when the user clicks the link. */
  onClick?: (path: string) => void;
  className?: string;
}

/**
 * NodeLink — a clickable reference chip that resolves the node's display name.
 *
 * Renders a button-style anchor. If the node is not yet loaded it shows
 * the last path segment as a fallback label.
 */
export function NodeLink({ path, label, onClick, className = "" }: NodeLinkProps) {
  const { data: node } = useNode(path);
  const displayLabel = label ?? node?.path.split("/").pop() ?? path.split("/").pop() ?? path;

  return (
    <button
      type="button"
      onClick={() => onClick?.(path)}
      className={`inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-xs font-medium hover:bg-accent transition-colors ${className}`}
    >
      {displayLabel}
    </button>
  );
}
