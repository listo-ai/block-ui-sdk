/**
 * Module Federation shared-singleton manifest — re-exported from
 * `@listo/ui-core/mf` so block authors depend only on `@listo/block-ui-sdk`
 * (their SDK facade) and never reach into `ui-core` directly.
 *
 * Usage in a block's rsbuild.config.ts:
 *
 * ```ts
 * import { MF_SHARED_SINGLETONS } from "@listo/block-ui-sdk/mf";
 * new ModuleFederationPlugin({ ..., shared: MF_SHARED_SINGLETONS });
 * ```
 */
export { MF_SHARED_SINGLETONS, type MfSharedSingletons } from "@listo/ui-core/mf";
