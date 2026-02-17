import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TngPopover } from './popover.component';
import { By } from '@angular/platform-browser';

const getRoot = (fix: ComponentFixture<Host>): HTMLDivElement | null =>
  fix.nativeElement.querySelector('tng-popover > div') as HTMLDivElement | null;

const getTrigger = (fix: ComponentFixture<Host>): HTMLButtonElement | null =>
  fix.nativeElement.querySelector('tng-popover button') as HTMLButtonElement | null;

const getPanel = (fix: ComponentFixture<Host>): HTMLElement | null =>
  fix.nativeElement.querySelector('tng-popover tng-overlay-panel div') as HTMLElement | null;

@Component({
  standalone: true,
  imports: [TngPopover],
  template: `
    <tng-popover [open]="open()" [slot]="slot()">
      <button tngPopoverTrigger type="button">Trigger</button>
      <ng-template #popoverContent>Panel content</ng-template>
    </tng-popover>
  `,
})
class Host {
  open = signal<boolean | null>(true);
  slot = signal<Record<string, string>>({});
}

describe('TngPopover', () => {

  afterEach(() => {
    document.querySelectorAll('tng-overlay-panel').forEach((n) => n.remove());
    TestBed.resetTestingModule();
  });

  const setup = async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    fix.detectChanges();
    return fix;
  };

  describe('Rendering', () => {
    it('renders root and trigger', async () => {
      const fix = await setup();
      expect(getRoot(fix)).toBeTruthy();
      expect(getTrigger(fix)).toBeTruthy();
      expect(getTrigger(fix)?.textContent).toContain('Trigger');
    });

    it('shows panel when open', async () => {
      const fix = await setup();
      const panel = getPanel(fix);
      expect(panel).toBeTruthy();
      expect(panel?.textContent?.trim()).toContain('Panel content');
    });

    it('does not render panel when closed', async () => {
      const fix = await setup();
      fix.componentInstance.open.set(false);
      fix.detectChanges();
      expect(getPanel(fix)).toBeNull();
    });
  });

  describe('Base classes', () => {
    it('applies root base classes', async () => {
      const fix = await setup();
      const root = getRoot(fix)!;
      expect(root.className).toContain('relative');
      expect(root.className).toContain('inline-flex');
    });

    it('applies trigger base classes', async () => {
      const fix = await setup();
      const trigger = getTrigger(fix)!;
      expect(trigger.className).toContain('inline-flex');
    });

    it('applies panel base classes', async () => {
      const fix = await setup();
      const panel = getPanel(fix)!;
      expect(panel.className).toContain('p-2');
    });
  });

  describe('Slot hooks', () => {
    it('applies container slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ container: 'flex gap-2' });
      fix.detectChanges();
      const root = getRoot(fix)!;
      expect(root.className).toContain('flex');
      expect(root.className).toContain('gap-2');
    });

    it('applies trigger slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ trigger: 'rounded-xl bg-primary' });
      fix.detectChanges();
      const trigger = getTrigger(fix)!;
      expect(trigger.className).toContain('rounded-xl');
      expect(trigger.className).toContain('bg-primary');
    });

    it('applies panel slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ panel: 'p-4 rounded-lg border-2' });
      fix.detectChanges();
      const panel = getPanel(fix)!;
      expect(panel.className).toContain('p-4');
      expect(panel.className).toContain('rounded-lg');
      expect(panel.className).toContain('border-2');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({});
      fix.detectChanges();
      const root = getRoot(fix)!;
      expect(root.className).toContain('relative');
    });
  });

  describe('Interaction', () => {

    const getComp = (fix: ComponentFixture<Host>) =>
      fix.debugElement.query(By.directive(TngPopover)).componentInstance as TngPopover;

    it('toggles open on trigger click', async () => {
      const fix = await setup();

      // 1) Ensure internalOpen is synced to CLOSED while still controlled
      fix.componentInstance.open.set(false);
      fix.detectChanges();

      // 2) Now switch to uncontrolled; internalOpen stays false
      fix.componentInstance.open.set(null);
      fix.detectChanges();

      const comp = getComp(fix);
      expect(comp.isOpen()).toBe(false);

      const trigger = getTrigger(fix)!;

      trigger.click();
      fix.detectChanges();
      expect(comp.isOpen()).toBe(true);

      trigger.click();
      fix.detectChanges();
      expect(comp.isOpen()).toBe(false);
    });
  });
});
