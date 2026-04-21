import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAgent } from "@listo/ui-core";
import type { NodeSnapshot, SlotChangedEvent } from "@listo/agent-client";

/**
 * Fetches a single node snapshot and keeps it fresh via SSE events.
 *
 * Subscribes to graph events on mount and invalidates the query cache
 * whenever a `slot_changed` event arrives for this node path.
 */
export function useNode(path: string) {
  const agent = useAgent();
  const qc = useQueryClient();

  const query = useQuery<NodeSnapshot>({
    queryKey: ["node", path],
    queryFn: () => agent.data!.nodes.getNode(path),
    enabled: path.length > 0 && agent.data !== undefined,
  });

  useEffect(() => {
    if (!agent.data || !path) return;
    const client = agent.data;
    let cancelled = false;
    void (async () => {
      for await (const event of client.events.subscribe()) {
        if (cancelled) break;
        if (
          (event as SlotChangedEvent).event === "slot_changed" &&
          (event as SlotChangedEvent).path === path
        ) {
          void qc.invalidateQueries({ queryKey: ["node", path] });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [agent.data, path, qc]);

  return query;
}
