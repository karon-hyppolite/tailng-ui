import type { ThemeTokenOverrides, ThemeTokens } from './token.types';

export type ThemeMode = 'light' | 'dark' | (string & {});

export interface ThemeMeta {
  name: string;
  mode: ThemeMode;
}

export interface ThemeDefinition {
  meta: ThemeMeta;
  tokens: ThemeTokens;
}

export interface ThemeOverride {
  meta?: Partial<ThemeMeta>;
  tokens?: ThemeTokenOverrides;
}
