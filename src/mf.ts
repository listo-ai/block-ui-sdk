/**
 * Module Federation shared-singleton factory — re-exported from
 * `@listo/ui-core/mf` so block authors depend only on `@listo/block-ui-sdk`
 * (their SDK facade) and never reach into `ui-core` directly.
 *
 * Usage in a block's rsbuild.config.ts:
 *
 * ```ts
 * import { createSharedSingletons } from "@listo/block-ui-sdk/mf";
 * new ModuleFederationPlugin({ ..., shared: createSharedSingletons() });
 * ```
 */
export { createSharedSingletons, type MfSharedSingletons } from "@listo/ui-core/mf";
