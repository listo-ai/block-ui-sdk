/**
 * @listo/block-ui-sdk
 *
 * Stable, versioned SDK for listo block micro-frontend authors.
 *
 * Block authors should import exclusively from this package — never
 * reach into `@listo/ui-core` directly. If something you need is missing
 * here, open a feature request on block-ui-sdk.
 */

// ── Hooks ─────────────────────────────────────────────────────────────────
export { useAgentClient } from "./hooks/useAgentClient";
export { useNode } from "./hooks/useNode";
export { useSlot } from "./hooks/useSlot";
export { useNodes } from "./hooks/useNodes";
export { useAction } from "./hooks/useAction";
export { useSubscription } from "./hooks/useSubscription";
export type { GraphEventHandler } from "./hooks/useSubscription";

// ── Components ────────────────────────────────────────────────────────────
export { BlockShell } from "./components/BlockShell";
export { NodeLink } from "./components/NodeLink";
export { SlotBadge } from "./components/SlotBadge";

// ── Registration ──────────────────────────────────────────────────────────
export {
  registerExtensionContributions,
  unregisterExtensionContributions,
  extensionRegistry,
} from "./registration";

// ── Re-exported types from agent-client ───────────────────────────────────
export type {
  NodeSnapshot,
  Slot,
  Kind,
  Link,
  GraphEvent,
  SlotChangedEvent,
  UiActionRequest,
  UiActionResponse,
} from "@listo/agent-client";
