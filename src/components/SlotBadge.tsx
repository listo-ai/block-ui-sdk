import React from "react";
import { Badge } from "@listo/ui-kit";
import { useSlot } from "../hooks/useSlot";

interface SlotBadgeProps {
  path: string;
  slotName: string;
  /** Format the slot value to a display string. Defaults to JSON.stringify. */
  format?: (value: unknown) => string;
  /** Map value to a badge variant. Defaults to "secondary". */
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

/**
 * SlotBadge — renders a Badge whose label mirrors a live slot value.
 *
 * Automatically refreshes when the node's slot changes via SSE events
 * (via the `useSlot` → `useNode` subscription chain).
 */
export function SlotBadge({
  path,
  slotName,
  format,
  variant = "secondary",
  className,
}: SlotBadgeProps) {
  const slot = useSlot(path, slotName);
  const value = slot?.value;
  const label =
    value === undefined || value === null
      ? "—"
      : format
        ? format(value)
        : typeof value === "string"
          ? value
          : JSON.stringify(value);

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
