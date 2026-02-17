import type { TemplateRef } from '@angular/core';
import type { TngAlign } from './align.type';
import type { TngCellContext, TngHeaderContext } from './context.type';

export type TngResolvedColumn<T> = {
  id: string;
  header: string;

  align?: TngAlign;
  width?: string;
  /** Extra classes from column slot (header = th, cell = td) */
  headerClass?: string;
  cellClass?: string;

  value?: (row: T) => unknown;

  headerTpl?: TemplateRef<TngHeaderContext>;
  cellTpl?: TemplateRef<TngCellContext<T>>;
};
