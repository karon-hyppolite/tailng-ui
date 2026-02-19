import type { ThemeTokenOverrides, ThemeTokens } from './token.types';

export type ThemeMode = 'light' | 'dark' | (string & {});

export type ThemeMeta = {
  name: string;
  mode: ThemeMode;
}

export type ThemeDefinition = {
  meta: ThemeMeta;
  tokens: ThemeTokens;
}

export type ThemeOverride = {
  meta?: Partial<ThemeMeta>;
  tokens?: ThemeTokenOverrides;
}
