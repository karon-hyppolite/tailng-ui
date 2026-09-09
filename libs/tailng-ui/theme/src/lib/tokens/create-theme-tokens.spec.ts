import { describe, expect, it } from 'vitest';
import { createThemeTokens, primitiveTokens } from './index';
import { darkSemanticTokens } from './semantic/dark';

describe('createThemeTokens', () => {
  it('uses the shared primitive tokens by default', () => {
    expect(createThemeTokens().primitives).toBe(primitiveTokens);
  });

  it('accepts custom semantic and primitive tokens', () => {
    const primitives = { ...primitiveTokens, radius: { md: '1rem' } };
    const tokens = createThemeTokens(darkSemanticTokens, primitives);

    expect(tokens.semantic).toBe(darkSemanticTokens);
    expect(tokens.primitives.radius['md']).toBe('1rem');
  });
});
