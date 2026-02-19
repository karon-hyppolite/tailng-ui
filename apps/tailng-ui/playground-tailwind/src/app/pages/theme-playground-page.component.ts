import { DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  createTheme,
  darkSemanticTokens,
  defaultThemePreset,
  minimalThemePreset,
  resolveToken,
  toCssVars,
} from '@tailng-ui/theme';
import type { ThemeDefinition, ThemeSemanticTokens } from '@tailng-ui/theme';

type PresetId = 'default' | 'minimal';
type ModeId = 'light' | 'dark';

type SelectOption<TValue extends string> = Readonly<{
  id: TValue;
  label: string;
}>;

type SemanticTokenRow = Readonly<{
  name: string;
  expression: string;
  resolvedValue: string;
}>;

const presetOptions: readonly SelectOption<PresetId>[] = [
  { id: 'default', label: 'Default' },
  { id: 'minimal', label: 'Minimal' },
];

const modeOptions: readonly SelectOption<ModeId>[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

const semanticCollections: readonly (keyof ThemeSemanticTokens)[] = [
  'background',
  'foreground',
  'border',
  'accent',
  'focus',
];

function isPresetId(value: string): value is PresetId {
  return presetOptions.some((option) => option.id === value);
}

function isModeId(value: string): value is ModeId {
  return modeOptions.some((option) => option.id === value);
}

function readSelectValue(event: Event): string | undefined {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement)) {
    return undefined;
  }

  return target.value;
}

@Component({
  selector: 'app-theme-playground-page',
  templateUrl: './theme-playground-page.component.html',
  styleUrl: './theme-playground-page.component.css',
})
export class ThemePlaygroundPageComponent {
  protected readonly presetOptions = presetOptions;
  protected readonly modeOptions = modeOptions;
  protected readonly selectedPreset = signal<PresetId>('default');
  protected readonly selectedMode = signal<ModeId>('light');

  protected readonly activeTheme = computed<ThemeDefinition>(() => {
    const basePreset = this.getBasePreset(this.selectedPreset());
    return createTheme(basePreset, {
      meta: {
        mode: this.selectedMode(),
      },
      tokens: {
        semantic: this.resolveSemanticTokens(basePreset, this.selectedMode()),
      },
    });
  });

  protected readonly semanticTokenRows = computed<readonly SemanticTokenRow[]>(() =>
    this.buildSemanticTokenRows(this.activeTheme()),
  );

  protected readonly themeMeta = computed<Readonly<{ name: string; mode: string }>>(() => {
    const theme = this.activeTheme();
    return {
      name: theme.meta.name,
      mode: theme.meta.mode,
    };
  });

  private readonly documentRef = inject(DOCUMENT);

  public constructor() {
    effect(() => {
      this.applyThemeVariables(this.activeTheme());
    });
  }

  protected onPresetChange(event: Event): void {
    const value = readSelectValue(event);
    if (value && isPresetId(value)) {
      this.selectedPreset.set(value);
    }
  }

  protected onModeChange(event: Event): void {
    const value = readSelectValue(event);
    if (value && isModeId(value)) {
      this.selectedMode.set(value);
    }
  }

  private getBasePreset(preset: PresetId): ThemeDefinition {
    if (preset === 'minimal') {
      return minimalThemePreset;
    }

    return defaultThemePreset;
  }

  private resolveSemanticTokens(basePreset: ThemeDefinition, mode: ModeId): ThemeSemanticTokens {
    if (mode === 'dark') {
      return darkSemanticTokens;
    }

    return basePreset.tokens.semantic;
  }

  private applyThemeVariables(theme: ThemeDefinition): void {
    const style = this.documentRef.documentElement.style;
    const cssVars = this.toResolvedCssVars(theme);

    for (const [name, value] of Object.entries(cssVars)) {
      style.setProperty(name, value);
    }
  }

  private toResolvedCssVars(theme: ThemeDefinition): Record<string, string> {
    const primitiveVars = toCssVars(theme, {
      includePrimitives: true,
      includeSemantic: false,
    });
    const semanticVars: Record<string, string> = {};

    for (const collection of semanticCollections) {
      const scale = theme.tokens.semantic[collection];
      for (const key of Object.keys(scale)) {
        semanticVars[`--tng-semantic-${collection}-${key}`] = this.resolveTokenValue(
          theme,
          scale[key],
        );
      }
    }

    return { ...primitiveVars, ...semanticVars };
  }

  private buildSemanticTokenRows(theme: ThemeDefinition): readonly SemanticTokenRow[] {
    const rows: SemanticTokenRow[] = [];

    for (const collection of semanticCollections) {
      const scale = theme.tokens.semantic[collection];
      for (const key of Object.keys(scale)) {
        const tokenExpression = scale[key];
        rows.push({
          name: `${collection}.${key}`,
          expression: tokenExpression,
          resolvedValue: this.resolveTokenValue(theme, tokenExpression),
        });
      }
    }

    return rows;
  }

  private resolveTokenValue(theme: ThemeDefinition, tokenExpression: string): string {
    if (!tokenExpression.startsWith('{') || !tokenExpression.endsWith('}')) {
      return tokenExpression;
    }

    const resolvedValue = resolveToken(theme, tokenExpression);
    return resolvedValue ?? tokenExpression;
  }
}
