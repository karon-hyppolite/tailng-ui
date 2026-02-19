export type TokenScale = Readonly<Record<string, string>>;

export type ThemePrimitives = {
  readonly color: TokenScale;
  readonly spacing: TokenScale;
  readonly radius: TokenScale;
  readonly typography: TokenScale;
  readonly motion: TokenScale;
};

export type ThemeSemanticTokens = {
  readonly background: TokenScale;
  readonly foreground: TokenScale;
  readonly border: TokenScale;
  readonly accent: TokenScale;
  readonly focus: TokenScale;
};

export type ThemeTokens = {
  readonly primitives: ThemePrimitives;
  readonly semantic: ThemeSemanticTokens;
};

export type ThemeTokenOverrides = {
  readonly primitives?: Partial<ThemePrimitives>;
  readonly semantic?: Partial<ThemeSemanticTokens>;
};
