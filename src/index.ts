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
// Kinds registry (read-only). Block authors occasionally need the
// `settings_schema` of their own kind to render a settings form.
export { useKinds } from "@listo/ui-core";
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

// ── Settings form (reused by blocks that render config panels) ────────────
// Re-exports the JSON-Schema form + debounced-save hook that Studio uses
// for its built-in property panel. Block authors wire them against the
// `settings` slot of any node they want to edit.
export {
  useNodeSettings,
  NodeSettingsForm,
  normalizeJsonSchema,
} from "@listo/ui-core";
export type { NodeSettingsState } from "@listo/ui-core";

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
