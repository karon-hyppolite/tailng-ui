# TailNG UI Monorepo

TailNG UI is an Nx + Angular monorepo for building and distributing TailNG packages:

- `@tailng-ui/theme`: theme contracts, token engine, CSS variable and Tailwind adapters
- `@tailng-ui/primitives`: unstyled behavior/accessibility primitives
- `@tailng-ui/components`: installable styled components on top of primitives
- `@tailng-ui/registry`: copy-paste registry entries used by the CLI
- `tailng`: CLI for listing and adding registry items

## Requirements

- Node.js `>=22.10.0`
- pnpm `>=10.30.0`

## Setup

```bash
pnpm install
```

## Workspace Layout

```text
apps/
  tailng-ui/
    docs
    playground-tailwind
    playground-vanilla
    playground-registry
libs/
  tailng-ui/
    theme
    primitives
    components
    registry
  tailng/
    cli
tools/
  prerender/
  release/
```

## Common Commands

### Development

```bash
# Tailwind playground
pnpm run playground

# Other playgrounds / docs
pnpm run dev:vanilla
pnpm run dev:registry
pnpm run dev:docs
```

### Build

```bash
# Build all projects
pnpm run build

# Build CLI only
pnpm run build:tailng

# Build docs and playground bundles
pnpm run docs:build
pnpm run playground:build
pnpm run playground:vanilla:build
```

### Tests

```bash
# Run all package test suites
pnpm run test

# Run a specific suite
pnpm run test:theme
pnpm run test:primitives
pnpm run test:components
pnpm run test:registry
pnpm run test:cli
```

### Lint and Format

```bash
pnpm run lint
pnpm run format:check
pnpm run format:write
```

### SEO / Prerender Tasks

```bash
pnpm run docs:seo
pnpm run playground:seo
pnpm run playground:vanilla:seo
```
