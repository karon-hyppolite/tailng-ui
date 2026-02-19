<div align="center">
  <img
    src="https://raw.githubusercontent.com/tailng/tailng-ui/main/apps/tailng-ui/docs/src/assets/logo.svg"
    width="96"
    alt="TailNG logo"
  />
</div>

# @tailng-ui/theme

Framework-agnostic theme contracts, tokens, and adapters for TailNG.

## Scope

- Theme contracts and token model
- Theme presets and merge engine
- CSS variables adapter
- Optional Tailwind adapter
- Component-level style contracts

## Token References

Semantic tokens can reference primitive tokens (for example: `{color.primary500}`).

- `toCssVars()` resolves references by default.
- `toCssVars({ resolveReferences: false })` keeps raw references.
- `toTailwindPreset()` resolves references before generating Tailwind values.

## Build

Run `nx build theme` to build the library.

## Test

Run tests for `theme`:

```bash
pnpm nx run theme:vite:test
```

Run in watch mode:

```bash
pnpm nx run theme:vite:test --watch
```

Run with coverage:

```bash
pnpm nx run theme:vite:test --coverage
```

Run directly with Vitest (without Nx):

```bash
pnpm exec vitest run --config libs/tailng-ui/theme/vitest.config.ts
```
