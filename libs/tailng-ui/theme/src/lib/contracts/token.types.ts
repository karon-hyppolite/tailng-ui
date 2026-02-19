export type TokenScale = Record<string, string>;

export type ThemePrimitives = {
  color: TokenScale;
  spacing: TokenScale;
  radius: TokenScale;
  typography: TokenScale;
  motion: TokenScale;
}

export type ThemeSemanticTokens = {
  background: TokenScale;
  foreground: TokenScale;
  border: TokenScale;
  accent: TokenScale;
  focus: TokenScale;
}

export type ThemeTokens = {
  primitives: ThemePrimitives;
  semantic: ThemeSemanticTokens;
}

export type ThemeTokenOverrides = {
  primitives?: Partial<ThemePrimitives>;
  semantic?: Partial<ThemeSemanticTokens>;
}
