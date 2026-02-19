export type TokenScale = Record<string, string>;

export interface ThemePrimitives {
  color: TokenScale;
  spacing: TokenScale;
  radius: TokenScale;
  typography: TokenScale;
  motion: TokenScale;
}

export interface ThemeSemanticTokens {
  background: TokenScale;
  foreground: TokenScale;
  border: TokenScale;
  accent: TokenScale;
  focus: TokenScale;
}

export interface ThemeTokens {
  primitives: ThemePrimitives;
  semantic: ThemeSemanticTokens;
}

export interface ThemeTokenOverrides {
  primitives?: Partial<ThemePrimitives>;
  semantic?: Partial<ThemeSemanticTokens>;
}
