import type { ThemeTokenOverrides, ThemeTokens } from './token.types';

export type ThemeMode = string;

export type ThemeMeta = {
  readonly name: string;
  readonly mode: ThemeMode;
};

export type ThemeDefinition = {
  readonly meta: ThemeMeta;
  readonly tokens: ThemeTokens;
};

export type ThemeOverride = {
  readonly meta?: Partial<ThemeMeta>;
  readonly tokens?: ThemeTokenOverrides;
};
