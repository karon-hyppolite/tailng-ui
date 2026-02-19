<div align="center">
  <img
    src="https://raw.githubusercontent.com/tailng/tailng-ui/main/apps/docs/src/assets/logo.svg"
    width="120"
    alt="TailNG logo"
  />

  <h1>TailNG</h1>

  <p>
    <strong>Scalability of Angular. Simplicity of Tailwind.</strong>
  </p>

  <p>
    A modern Angular 21+ component system built with Signals,
    Standalone APIs, and strict architectural discipline.
  </p>
</div>

---

[![Build Status](https://github.com/tailng/tailng-ui/actions/workflows/prod-build-deploy.yml/badge.svg)](https://github.com/tailng/tailng-ui/actions/workflows/prod-build-deploy.yml)
[![NPM Version](https://img.shields.io/npm/v/@tailng-ui/ui.svg)](https://www.npmjs.com/package/@tailng-ui/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ What is TailNG?

TailNG is an open-source Angular component system designed for:

- Large applications
- Enterprise design systems
- Strict type safety
- Accessibility-first development
- Signal-based architecture
- Tailwind-compatible styling

It combines:

- Angular 21+
- Standalone Components
- Angular Signals
- Strict ESLint architecture
- Nx monorepo discipline
- Optional Tailwind integration

---

## 🎯 Product Direction

TailNG is evolving toward a framework-agnostic component platform with:

- Accessibility-first primitives built on Angular CDK and `@angular/aria` (experimental)
- Wrapper abstractions that make component composition simpler for app developers
- Additional in-house components implemented using ARIA authoring principles
- Micro-level styling control for each component (slots, states, tokens, and hooks)
- No required dependency on Tailwind or any specific CSS framework
- Zero hard coupling between component behavior and styling systems
- Shadcn-style copy/paste distribution mode in addition to package install

### Risk Decision (`@angular/aria`)

- Primary path: use `@angular/aria` as the basis for new primitives
- Current tradeoff: accept experimental risk while Angular 22 direction matures
- Fallback policy: do not build full CDK fallback now
- Constraint: keep an adapter seam now so fallback can be implemented later without rewrites
- Rule: components depend on TailNG primitive contracts, not direct `@angular/aria` imports

---

## 📦 Packages

| Package | Description |
|----------|-------------|
| `@tailng-ui/ui` | Main component library |
| `@tailng-ui/cdk` | Behavior primitives & utilities |
| `@tailng-ui/theme` | Design tokens & Tailwind adapter |
| `@tailng-ui/icons` | Icon wrappers |

---

## 🚀 Installation

```bash
pnpm add @tailng-ui/ui
```

Peer dependencies:

- `@angular/core` ^21
- `@angular/common` ^21
- `@angular/forms` ^21

---

## ⚡ Quick Example

```ts
import { Component } from '@angular/core';
import { TngButton } from '@tailng-ui/ui';

@Component({
  standalone: true,
  imports: [TngButton],
  template: `
    <tng-button variant="primary">
      Click me
    </tng-button>
  `,
})
export class ExampleComponent {}
```

---

## 🏗 Architecture

TailNG follows a layered structure:

apps/
  docs/          → Documentation site
  playground/    → Component sandbox

libs/
  ui/            → Styled components
  cdk/           → Behavior primitives
  theme/         → Tokens & adapters
  icons/         → Icon library

Design principles:

- Composition over prop explosion
- Behavior separated from styling
- Strict architectural boundaries (Nx enforced)
- Public API discipline
- No deep imports
- Exhaustive state safety

---

## 🧠 Philosophy

TailNG is:

- Headless-friendly
- Tailwind-compatible (not required)
- Accessibility-aware
- Strictly typed
- Enterprise-ready
- Open-source forever (MIT)

We aim to provide:

- Clean APIs
- Predictable behavior
- Scalable structure
- Zero vendor lock-in

---

## 🧪 Development

### Install dependencies

```bash
pnpm install
```

### Run playground

```bash
pnpm playground
```

### Run docs site

```bash
pnpm docs
```

### Lint

```bash
pnpm nx run-many -t lint
```

### Test

```bash
pnpm nx run-many -t vite:test
```

Run tests for the `theme` library:

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

---

## 🏷 Component Guidelines

- Use Angular Signals (`input()`)
- Standalone components only
- No default exports
- Explicit return types
- Exhaustive switch checks
- Complexity ≤ 8
- Max params ≤ 3
- Accessibility-first markup
- Strict ESLint enforced

---

## 📖 Documentation

- Website: https://tailng.dev
- npm: https://www.npmjs.com/package/@tailng-ui/ui
- GitHub: https://github.com/tailng/tailng-ui

---

## 🤝 Contributing

Contributions are welcome.

Before submitting a PR:

- Follow ESLint rules
- Respect architectural boundaries
- Avoid deep imports
- Maintain strict typing
- Include playground demo

---

## 📜 License

MIT © 2026 TailNG
