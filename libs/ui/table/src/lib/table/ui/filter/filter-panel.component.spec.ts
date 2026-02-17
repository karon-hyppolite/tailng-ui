// filter-panel.component.spec.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TngFilterPanel } from './filter-panel.component';
import { TNG_TABLE } from '../../core/tokens/table.token';
import { TngTableController } from '../../core/controller/table.controller';

const getPanel = (fix: ComponentFixture<Host>): HTMLElement | null =>
  fix.nativeElement.querySelector('tng-filter-panel tng-overlay-panel div') as HTMLElement | null;

const getClearBtn = (fix: ComponentFixture<Host>): HTMLButtonElement | null =>
  fix.nativeElement.querySelector('tng-filter-panel button:first-of-type') as HTMLButtonElement | null;

const getCloseBtn = (fix: ComponentFixture<Host>): HTMLButtonElement | null =>
  fix.nativeElement.querySelector('tng-filter-panel button[aria-label="Close filter"]') as HTMLButtonElement | null;

@Component({
  standalone: true,
  imports: [TngFilterPanel],
  template: `
    <div #anchor class="anchor">Anchor</div>
    <tng-filter-panel />
  `,
  providers: [
    {
      provide: TngTableController,
      useFactory: () => {
        const ctrl = new TngTableController();
        ctrl.registerColumn({
          id: 'col1',
          label: 'Name',
          filter: { type: 'text', placeholder: 'Search…' },
        });
        return ctrl;
      },
    },
    {
      provide: TNG_TABLE,
      useExisting: TngTableController,
    },
  ],
})
class Host {
  @ViewChild('anchor') anchor!: ElementRef<HTMLElement>;

  constructor(private table: TngTableController) {}

  ngAfterViewInit(): void {
    this.table.openFilter('col1', this.anchor?.nativeElement ?? null);
  }
}

describe('TngFilterPanel', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);

    // 1st CD: runs ngAfterViewInit and opens the filter
    fix.detectChanges();

    // 2nd CD: lets overlay render
    fix.detectChanges();

    return fix;
  };

  describe('Rendering', () => {
    it('renders panel when filter is open', async () => {
      const fix = await setup();
      const panel = getPanel(fix);
      expect(panel).toBeTruthy();
      expect(panel?.textContent).toContain('Filter');
      expect(panel?.textContent).toContain('col1');
    });

    it('renders text filter UI when filter type is text', async () => {
      const fix = await setup();
      expect(fix.nativeElement.textContent).toContain('Contains');
      expect(fix.nativeElement.querySelector('input[placeholder]')).toBeTruthy();
    });

    it('does not render panel when filter is closed', async () => {
      const fix = await setup();
      const table = fix.debugElement.injector.get(TNG_TABLE);
      table.closeFilter();
      fix.detectChanges();
      expect(getPanel(fix)).toBeNull();
    });
  });

  describe('Base classes', () => {
    it('applies panel base classes', async () => {
      const fix = await setup();
      const panel = getPanel(fix)!;
      expect(panel.className).toContain('min-w-80');
      expect(panel.className).toContain('max-w-[360px]');
      expect(panel.className).toContain('p-0');
    });
  });

  describe('Slot hooks', () => {
    it('applies panel slot classes from controller', async () => {
      const fix = await setup();
      const table = fix.debugElement.injector.get(TNG_TABLE);
      table.setFilterPanelSlot({ panel: 'p-4 rounded-xl border-2' });
      fix.detectChanges();

      const panel = getPanel(fix)!;
      expect(panel.className).toContain('p-4');
      expect(panel.className).toContain('rounded-xl');
      expect(panel.className).toContain('border-2');
    });

    it('merges base classes with slot classes', async () => {
      const fix = await setup();
      const table = fix.debugElement.injector.get(TNG_TABLE);
      table.setFilterPanelSlot({ panel: 'bg-primary/10' });
      fix.detectChanges();

      const panel = getPanel(fix)!;
      expect(panel.className).toContain('min-w-80');
      expect(panel.className).toContain('bg-primary/10');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();
      const table = fix.debugElement.injector.get(TNG_TABLE);
      table.setFilterPanelSlot({});
      fix.detectChanges();

      const panel = getPanel(fix)!;
      expect(panel.className).toContain('min-w-80');
    });
  });

  describe('Interaction', () => {
    it('closes filter when close button is clicked', async () => {
      const fix = await setup();
      const table = fix.debugElement.injector.get(TNG_TABLE);

      const closeBtn = getCloseBtn(fix);
      expect(closeBtn).toBeTruthy();

      closeBtn!.click();
      fix.detectChanges();

      expect(table.openFilterColId()).toBe('');
    });

    it('clears filter when clear button is clicked', async () => {
      const fix = await setup();
      const table = fix.debugElement.injector.get(TNG_TABLE);

      table.setFilter('col1', 'test');
      fix.detectChanges();

      const clearBtn = getClearBtn(fix);
      expect(clearBtn).toBeTruthy();

      clearBtn!.click();
      fix.detectChanges();

      expect(table.filterValueFor('col1')).toBeUndefined();
    });
  });
});