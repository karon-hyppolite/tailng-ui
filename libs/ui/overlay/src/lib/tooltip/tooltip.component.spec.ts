// tooltip.component.spec.ts
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TngTooltip } from './tooltip.component';

const getHostEl = (fix: ComponentFixture<Host>): HTMLElement | null =>
  fix.nativeElement.querySelector('tng-tooltip') as HTMLElement | null;

const getPanel = (fix: ComponentFixture<Host>): HTMLElement | null =>
  fix.nativeElement.querySelector('tng-tooltip tng-overlay-panel div') as HTMLElement | null;

@Component({
  standalone: true,
  imports: [TngTooltip],
  template: `
    <tng-tooltip [text]="text()" [slot]="slot()" [showDelay]="0" [hideDelay]="0">
      <button type="button">Trigger</button>
    </tng-tooltip>
  `,
})
class Host {
  text = signal('Tooltip content');
  slot = signal<Record<string, string>>({});
}

describe('TngTooltip', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    fix.detectChanges();
    return fix;
  };

  describe('Rendering', () => {
    it('renders trigger', async () => {
      const fix = await setup();
      expect(fix.nativeElement.textContent).toContain('Trigger');
    });

    it('shows panel on hover', async () => {
      const fix = await setup();
      const host = getHostEl(fix)!;
      host.dispatchEvent(new Event('mouseenter'));
      fix.detectChanges();
      // With showDelay=0, panel should appear after microtask
      await new Promise((r) => setTimeout(r, 50));
      fix.detectChanges();
      const panel = getPanel(fix);
      expect(panel).toBeTruthy();
      expect(panel?.textContent?.trim()).toContain('Tooltip content');
    });
  });

  describe('Slot hooks', () => {
    it('applies panel slot classes to overlay', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ panel: 'px-4 py-3 text-lg' });
      fix.detectChanges();
      getHostEl(fix)!.dispatchEvent(new Event('mouseenter'));
      await new Promise((r) => setTimeout(r, 50));
      fix.detectChanges();
      const panel = getPanel(fix);
      expect(panel?.className).toContain('px-4');
      expect(panel?.className).toContain('py-3');
      expect(panel?.className).toContain('text-lg');
    });

    it('applies surface slot classes to overlay', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ surface: 'rounded-xl border-2' });
      fix.detectChanges();
      getHostEl(fix)!.dispatchEvent(new Event('mouseenter'));
      await new Promise((r) => setTimeout(r, 50));
      fix.detectChanges();
      const panel = getPanel(fix);
      expect(panel?.className).toContain('rounded-xl');
      expect(panel?.className).toContain('border-2');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({});
      fix.detectChanges();
      getHostEl(fix)!.dispatchEvent(new Event('mouseenter'));
      await new Promise((r) => setTimeout(r, 50));
      fix.detectChanges();
      const panel = getPanel(fix);
      expect(panel?.className).toContain('px-3');
      expect(panel?.className).toContain('rounded-md');
    });
  });
});
