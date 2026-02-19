import type { ThemePrimitives, ThemeSemanticTokens, ThemeTokens } from '../contracts/token.types';
import { colorPrimitives } from './primitives/color';
import { motionPrimitives } from './primitives/motion';
import { radiusPrimitives } from './primitives/radius';
import { spacingPrimitives } from './primitives/spacing';
import { typographyPrimitives } from './primitives/typography';
import { lightSemanticTokens } from './semantic/light';

export const primitiveTokens: ThemePrimitives = {
  color: colorPrimitives,
  spacing: spacingPrimitives,
  radius: radiusPrimitives,
  typography: typographyPrimitives,
  motion: motionPrimitives,
};

export function createThemeTokens(
  semantic: ThemeSemanticTokens = lightSemanticTokens,
): ThemeTokens {
  return {
    primitives: primitiveTokens,
    semantic,
  };
}
