// table.component.spec.ts
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TngCol } from '../column/col.component';
import { TngTable } from './table.component';

const getTable = (fix: ComponentFixture<Host>): HTMLTableElement | null =>
  fix.nativeElement.querySelector('tng-table table') as HTMLTableElement | null;

const getThead = (fix: ComponentFixture<Host>): HTMLTableSectionElement | null =>
  fix.nativeElement.querySelector('tng-table thead') as HTMLTableSectionElement | null;

const getTbody = (fix: ComponentFixture<Host>): HTMLTableSectionElement | null =>
  fix.nativeElement.querySelector('tng-table tbody') as HTMLTableSectionElement | null;

const getTh = (fix: ComponentFixture<Host>, index: number): HTMLTableCellElement | null =>
  fix.nativeElement.querySelectorAll('tng-table th')[index] as HTMLTableCellElement | null;

const getTd = (fix: ComponentFixture<Host>, row: number, col: number): HTMLTableCellElement | null =>
  fix.nativeElement.querySelectorAll('tng-table tbody tr')[row]?.querySelectorAll('td')[col] as HTMLTableCellElement | null;

type Row = { id: string; name: string; score: number };

@Component({
  standalone: true,
  imports: [TngTable, TngCol],
  template: `
    <tng-table [rows]="rows()" [rowKey]="'id'" [slot]="slot()">
      <tng-col id="name" header="Name" [value]="nameValue"></tng-col>
      <tng-col id="score" header="Score" align="right" [value]="scoreValue"></tng-col>
    </tng-table>
  `,
})
class Host {
  rows = signal<Row[]>([
    { id: '1', name: 'Alice', score: 92 },
    { id: '2', name: 'Bob', score: 87 },
  ]);
  slot = signal<Record<string, string>>({});
  nameValue = (r: Row) => r.name;
  scoreValue = (r: Row) => r.score;
}

describe('TngTable', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    fix.detectChanges();
    return fix;
  };

  describe('Rendering', () => {
    it('renders table, thead, tbody', async () => {
      const fix = await setup();
      expect(getTable(fix)).toBeTruthy();
      expect(getThead(fix)).toBeTruthy();
      expect(getTbody(fix)).toBeTruthy();
    });

    it('renders rows and cells', async () => {
      const fix = await setup();
      expect(fix.nativeElement.textContent).toContain('Alice');
      expect(fix.nativeElement.textContent).toContain('Bob');
      expect(fix.nativeElement.textContent).toContain('92');
      expect(fix.nativeElement.textContent).toContain('87');
    });

    it('shows empty text when no rows', async () => {
      const fix = await setup();
      fix.componentInstance.rows.set([]);
      fix.detectChanges();
      expect(fix.nativeElement.textContent).toContain('No data');
    });
  });

  describe('Base classes', () => {
    it('applies table base classes', async () => {
      const fix = await setup();
      const table = getTable(fix)!;
      expect(table.className).toContain('w-full');
      expect(table.className).toContain('text-sm');
    });

    it('applies thead base classes', async () => {
      const fix = await setup();
      const thead = getThead(fix)!;
      expect(thead.className).toContain('bg-alternate-background');
    });

    it('applies tbody base classes', async () => {
      const fix = await setup();
      const tbody = getTbody(fix)!;
      expect(tbody.className).toContain('bg-bg');
    });
  });

  describe('Slot hooks', () => {
    it('applies table slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ table: 'min-w-full text-xs' });
      fix.detectChanges();
      const table = getTable(fix)!;
      expect(table.className).toContain('min-w-full');
      expect(table.className).toContain('text-xs');
    });

    it('applies thead slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ thead: 'bg-primary/10' });
      fix.detectChanges();
      const thead = getThead(fix)!;
      expect(thead.className).toContain('bg-primary/10');
    });

    it('applies th slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ th: 'px-4 py-3 font-bold' });
      fix.detectChanges();
      const th = getTh(fix, 0)!;
      expect(th.className).toContain('px-4');
      expect(th.className).toContain('py-3');
      expect(th.className).toContain('font-bold');
    });

    it('applies td slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ td: 'px-4 py-3' });
      fix.detectChanges();
      const td = getTd(fix, 0, 0)!;
      expect(td.className).toContain('px-4');
      expect(td.className).toContain('py-3');
    });

    it('applies tbody slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ tbody: 'bg-slate-50' });
      fix.detectChanges();
      const tbody = getTbody(fix)!;
      expect(tbody.className).toContain('bg-slate-50');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({});
      fix.detectChanges();
      const table = getTable(fix)!;
      expect(table.className).toContain('w-full');
    });
  });
});
