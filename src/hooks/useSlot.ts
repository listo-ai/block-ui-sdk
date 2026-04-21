import { useEffect, useState } from "react";
import { useNode } from "./useNode";
import type { Slot } from "@listo/agent-client";

/**
 * Returns the current value of a named slot on a node, updating live
 * whenever the parent `useNode` query is invalidated via SSE events.
 *
 * `NodeSnapshot.slots` is an array of `{ name, value, generation }` objects.
 *
 * @param path  - node path (e.g. `"/root/my-sensor"`)
 * @param slotName - slot key as declared in the kind manifest
 */
export function useSlot(path: string, slotName: string): Slot | undefined {
  const nodeQuery = useNode(path);
  const [slot, setSlot] = useState<Slot | undefined>(() =>
    nodeQuery.data?.slots.find((s) => s.name === slotName),
  );

  useEffect(() => {
    setSlot(nodeQuery.data?.slots.find((s) => s.name === slotName));
  }, [nodeQuery.data, slotName]);

  return slot;
}
