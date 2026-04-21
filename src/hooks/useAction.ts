import { useMutation } from "@tanstack/react-query";
import { useAgent } from "@listo/ui-core";
import type { UiActionRequest, UiActionResponse } from "@listo/agent-client";

/**
 * Fires a SDUI action against the agent and returns the response.
 *
 * Wraps `client.ui.action(req)` in a react-query mutation so the
 * caller gets `isPending`, `isError`, and `data` for free.
 *
 * @example
 * const action = useAction();
 * action.mutate({ target: "/root/my-block", action: { id: "submit" }, context: {} });
 */
export function useAction() {
  const agent = useAgent();

  return useMutation<UiActionResponse, Error, UiActionRequest>({
    mutationFn: (req) => {
      if (!agent.data) throw new Error("AgentClient not ready");
      return agent.data.ui.action(req);
    },
  });
}
