# AGENT.md — block-ui-sdk

`@listo/block-ui-sdk` — stable, versioned SDK for Listo block micro-frontend authors. Provides the contract and utilities that every block implementation must use to integrate with the Listo agent host (registration, component helpers, hooks, agent client access).

---

## Skills

See [SKILLS/ts.md](../SKILLS/ts.md) for the full skill map.

Quick reference for this repo:

| Task | Skill path |
|------|------------|
| API / interface design | `~/.agents/skills/api-and-interface-design/SKILL.md` |
| Building / modifying UI components | `~/.agents/skills/frontend-ui-engineering/SKILL.md` |
| TDD | `~/.agents/skills/test-driven-development/SKILL.md` |
| Deprecation / migration | `~/.agents/skills/deprecation-and-migration/SKILL.md` |
| Code review | `~/.agents/skills/code-review-and-quality/SKILL.md` |
| Security | `~/.agents/skills/security-and-hardening/SKILL.md` |

---

## Tech Stack

- **Language**: TypeScript (strict mode)
- **Package manager**: `pnpm` (workspace root)
- **Registry**: npm (`@listo/block-ui-sdk`)
- **Runtime**: Browser (ESM, React)
- **Build**: `tsc`

## Key dependencies

| Package | Role |
|---------|------|
| `@listo/agent-client` | Typed REST client — blocks call agent APIs through this |
| `@listo/ui-core` | Integration layer — SDUI, auth, graph hooks available to blocks |
| `@listo/ui-kit` | Design system primitives blocks should use for consistent UI |

## Source layout

```
src/
  components/     # base components blocks can extend or compose
  hooks/          # block lifecycle and agent integration hooks
  registration.ts # block registration API — blocks must call register()
  index.ts        # public API surface — the stable contract for block authors
```

## Workspace commands

```bash
pnpm install          # fetch dependencies (run from workspace root)
pnpm build            # compile with tsc
pnpm typecheck        # type-check without emit
```

## Conventions

- **Stability first** — this is a public SDK. Treat every export as a breaking change risk. Use the `deprecation-and-migration` skill before removing or changing any public API.
- All public types, functions, and hooks must have JSDoc comments explaining usage from a block author's perspective.
- Blocks must only interact with the agent through `@listo/agent-client` — never fetch directly.
- Use `@listo/ui-kit` for all visual output — blocks must not bundle their own design primitives.
- `src/index.ts` is the stable contract — only intentional, reviewed exports belong here.
- Strict TypeScript — no `any` on the public surface. Generic constraints preferred over union hacks.
- Versioning is semver-strict: patch for fixes, minor for additive exports, major for any breaking change.
