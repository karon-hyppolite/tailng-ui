// dialog.component.spec.ts
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TngDialog } from './dialog.component';

const getBackdrop = (fix: ComponentFixture<Host>): HTMLDivElement | null =>
  fix.nativeElement.querySelector('tng-dialog > div:first-of-type') as HTMLDivElement | null;

const getPanel = (fix: ComponentFixture<Host>): HTMLDivElement | null =>
  fix.nativeElement.querySelector('tng-dialog > div[role="dialog"]') as HTMLDivElement | null;

const getHeaderWrap = (fix: ComponentFixture<Host>): HTMLDivElement | null =>
  fix.nativeElement.querySelector('tng-dialog [role="dialog"] > div:first-of-type') as HTMLDivElement | null;

const getBodyWrap = (fix: ComponentFixture<Host>): HTMLDivElement | null =>
  fix.nativeElement.querySelector('tng-dialog [role="dialog"] > div:nth-of-type(2)') as HTMLDivElement | null;

const getFooterWrap = (fix: ComponentFixture<Host>): HTMLDivElement | null =>
  fix.nativeElement.querySelector('tng-dialog [role="dialog"] > div:last-of-type') as HTMLDivElement | null;

@Component({
  standalone: true,
  imports: [TngDialog],
  template: `
    <tng-dialog
      [open]="open()"
      [slot]="slot()"
      (closed)="closed.emit($event)"
    >
      <div tngDialogHeader>Header</div>
      <p>Body content</p>
      <div tngDialogFooter>Footer</div>
    </tng-dialog>
  `,
})
class Host {
  open = signal(true);
  slot = signal<Record<string, string>>({});
  closed = { emit: (_reason: unknown) => {} };
}

describe('TngDialog', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    fix.detectChanges(false);
    return fix;
  };

  describe('Rendering', () => {
    it('renders backdrop and panel when open', async () => {
      const fix = await setup();
      const backdrop = getBackdrop(fix);
      const panel = getPanel(fix);

      expect(backdrop).toBeTruthy();
      expect(panel).toBeTruthy();
      expect(panel!.getAttribute('role')).toBe('dialog');
      expect(panel!.getAttribute('aria-modal')).toBe('true');
      expect(panel!.textContent).toContain('Header');
      expect(panel!.textContent).toContain('Body content');
      expect(panel!.textContent).toContain('Footer');
    });

    it('does not render when closed', async () => {
      const fix = await setup();
      fix.componentInstance.open.set(false);
      fix.detectChanges(false);

      expect(getBackdrop(fix)).toBeNull();
      expect(getPanel(fix)).toBeNull();
    });
  });

  describe('Base classes', () => {
    it('applies backdrop base classes', async () => {
      const fix = await setup();
      const backdrop = getBackdrop(fix)!;
      expect(backdrop.className).toContain('fixed');
      expect(backdrop.className).toContain('inset-0');
      expect(backdrop.className).toContain('bg-black');
    });

    it('applies panel base classes', async () => {
      const fix = await setup();
      const panel = getPanel(fix)!;
      expect(panel.className).toContain('fixed');
      expect(panel.className).toContain('rounded-lg');
      expect(panel.className).toContain('bg-bg');
    });

    it('applies headerWrap base classes', async () => {
      const fix = await setup();
      const header = getHeaderWrap(fix)!;
      expect(header.className).toContain('border-b');
      expect(header.className).toContain('px-4');
    });

    it('applies bodyWrap base classes', async () => {
      const fix = await setup();
      const body = getBodyWrap(fix)!;
      expect(body.className).toContain('px-4');
      expect(body.className).toContain('py-4');
    });

    it('applies footerWrap base classes', async () => {
      const fix = await setup();
      const footer = getFooterWrap(fix)!;
      expect(footer.className).toContain('border-t');
    });
  });

  describe('Slot hooks', () => {
    it('applies backdrop slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ backdrop: 'fixed inset-0 bg-black/60' });
      fix.detectChanges(false);

      expect(getBackdrop(fix)!.className).toContain('bg-black/60');
    });

    it('applies panel slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ panel: 'rounded-xl border-2 border-primary' });
      fix.detectChanges(false);

      const panel = getPanel(fix)!;
      expect(panel.className).toContain('rounded-xl');
      expect(panel.className).toContain('border-2');
      expect(panel.className).toContain('border-primary');
    });

    it('applies headerWrap slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ headerWrap: 'border-primary bg-primary/10' });
      fix.detectChanges(false);

      expect(getHeaderWrap(fix)!.className).toContain('border-primary');
    });

    it('applies footerWrap slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ footerWrap: 'flex justify-end gap-2' });
      fix.detectChanges(false);

      expect(getFooterWrap(fix)!.className).toContain('flex');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({});
      fix.detectChanges(false);

      expect(getBackdrop(fix)!.className).toContain('fixed');
      expect(getPanel(fix)!.className).toContain('rounded-lg');
    });
  });

  describe('Interaction', () => {
    it('emits closed when backdrop is clicked', async () => {
      const fix = await setup();

      const emitSpy = jest.spyOn(fix.componentInstance.closed, 'emit');

      getBackdrop(fix)!.click();
      fix.detectChanges(false);

      expect(emitSpy).toHaveBeenCalledWith('outside-click');
    });

    it('emits closed on Escape when closeOnEscape is true', async () => {
      const fix = await setup();

      const emitSpy = jest.spyOn(fix.componentInstance.closed, 'emit');

      getPanel(fix)!.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
      fix.detectChanges(false);

      expect(emitSpy).toHaveBeenCalledWith('escape');
    });
  });
});