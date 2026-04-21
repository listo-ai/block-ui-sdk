/**
 * useAgentClient — resolves the singleton AgentClient.
 *
 * Thin re-export of `useAgent` from `@listo/ui-core`, renamed for
 * clarity in the block author context. Returns a react-query `UseQueryResult`.
 *
 * @example
 * const { data: client } = useAgentClient();
 */
export { useAgent as useAgentClient } from "@listo/ui-core";
