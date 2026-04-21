import { useEffect, useRef } from "react";
import { useAgent } from "@listo/ui-core";
import type { GraphEvent } from "@listo/agent-client";

export type GraphEventHandler = (event: GraphEvent) => void;

/**
 * SSE subscription scoped to a set of node path subjects.
 *
 * Calls `onEvent` for every GraphEvent where `event.path` matches
 * one of the provided `subjects`. If `subjects` is empty, calls
 * `onEvent` for all events.
 *
 * The subscription is automatically closed on unmount or when
 * `subjects`/`onEvent` identity changes.
 *
 * @param subjects - array of node paths to filter by; empty = all events
 * @param onEvent  - stable callback (wrap in useCallback to avoid churn)
 */
export function useSubscription(
  subjects: string[],
  onEvent: GraphEventHandler,
) {
  const agent = useAgent();
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  useEffect(() => {
    if (!agent.data) return;
    const client = agent.data;
    const sub = client.events.subscribe();
    let cancelled = false;

    void (async () => {
      for await (const event of sub) {
        if (cancelled) break;
        const path = (event as { path?: string }).path;
        if (subjects.length === 0 || (path && subjects.includes(path))) {
          onEventRef.current(event);
        }
      }
    })();

    return () => {
      cancelled = true;
      sub.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent.data, subjects.join(",")]);
}
