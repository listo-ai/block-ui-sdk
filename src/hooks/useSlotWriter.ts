import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { AgentClient } from "@listo/agent-client";
import { useAgent } from "@listo/ui-core";

/**
 * Options for a single `writeSlot` call.
 *
 * `expectedGeneration` enables OCC writes: the server rejects the write
 * with a 409 if the slot's generation differs, preventing a silent
 * clobber. Leave `undefined` for LWW (last-writer-wins) semantics.
 */
export interface WriteSlotOptions {
  /**
   * OCC guard. Pass the `generation` value from the slot you last read.
   * The server rejects the write if the slot has advanced since your read.
   */
  expectedGeneration?: number;
}

/** Return value of `useSlotWriter`. */
export interface SlotWriterApi {
  /**
   * Write `value` to `slot` on the node at `path`.
   *
   * The write goes directly to the agent; there is no in-SDK optimistic
   * patch. The live cache is refreshed on success via a query invalidation
   * so React-Query-powered hooks (`useNode`, `useSlot`) update automatically.
   *
   * @returns `true` on success, `false` on failure (error is also in `error`).
   */
  writeSlot: (
    path: string,
    slot: string,
    value: unknown,
    opts?: WriteSlotOptions,
  ) => Promise<boolean>;
  /** `true` while a write is in-flight. */
  isPending: boolean;
  /** Last error, if any. `null` when idle or after a successful write. */
  error: Error | null;
  /** Clear `error` and reset state to idle. */
  clearError: () => void;
}

/**
 * `useSlotWriter` — imperative slot write for block micro-frontends.
 *
 * Block authors reach for this when they want to write a slot value
 * directly from a custom control, settings panel, or form — anywhere
 * outside the SDUI two-way-binding system.
 *
 * @example
 * ```tsx
 * const { writeSlot, isPending, error } = useSlotWriter();
 *
 * const handleSave = async () => {
 *   const ok = await writeSlot("/root/pump-01", "setpoint", 42.5);
 *   if (ok) console.log("written");
 * };
 * ```
 */
export function useSlotWriter(): SlotWriterApi {
  const agentQuery = useAgent();
  const qc = useQueryClient();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const writeSlot = useCallback(
    async (
      path: string,
      slot: string,
      value: unknown,
      opts?: WriteSlotOptions,
    ): Promise<boolean> => {
      const client = agentQuery.data as AgentClient | undefined;
      if (!client) {
        setError(new Error("Agent client not ready"));
        return false;
      }

      setIsPending(true);
      setError(null);

      try {
        await client.slots.writeSlot(path, slot, value, {
          expectedGeneration: opts?.expectedGeneration,
        });

        // Invalidate node queries for this path so live hooks update.
        await qc.invalidateQueries({
          predicate: (q) => {
            const key = q.queryKey;
            return (
              Array.isArray(key) &&
              key.some((k) => typeof k === "string" && k === path)
            );
          },
        });

        return true;
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [agentQuery.data, qc],
  );

  return { writeSlot, isPending, error, clearError };
}
