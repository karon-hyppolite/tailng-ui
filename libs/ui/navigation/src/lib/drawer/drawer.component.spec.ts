import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TngDrawer } from './drawer.component';

const getBackdrop = (fix: ComponentFixture<Host>): HTMLDivElement | null => {
  const els = Array.from(
    fix.nativeElement.querySelectorAll('tng-drawer > div')
  ) as HTMLDivElement[];

  return els.find((el) => el.classList.contains('z-[1000]')) ?? null;
};

const getPanel = (fix: ComponentFixture<Host>): HTMLDivElement | null =>
  (fix.nativeElement.querySelector('tng-drawer > div[role="dialog"]') as HTMLDivElement | null);


@Component({
  standalone: true,
  imports: [TngDrawer],
  template: `
    <tng-drawer
      [open]="open()"
      [placement]="placement()"
      [slot]="slot()"
      (closed)="closed.emit($event)"
    >
      <div class="p-4">Content</div>
    </tng-drawer>
  `,
})
class Host {
  open = signal(true);
  placement = signal<'left' | 'right' | 'top' | 'bottom'>('left');
  slot = signal<Record<string, string>>({});

  closed = { emit: (_reason: unknown) => {} };
}

describe('TngDrawer', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    // IMPORTANT: avoid NG0100 from signal/effect updates during CD
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
      expect(panel!.textContent?.trim()).toContain('Content');
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

    it('applies panel base classes for left placement', async () => {
      const fix = await setup();

      fix.componentInstance.placement.set('left');
      fix.detectChanges(false);

      const panel = getPanel(fix)!;
      expect(panel.className).toContain('bg-bg');
      expect(panel.className).toContain('shadow-xl');
      expect(panel.className).toContain('w-80');
      expect(panel.className).toContain('left-0');
    });

    it('applies size for right placement', async () => {
      const fix = await setup();

      fix.componentInstance.placement.set('right');
      fix.detectChanges(false);

      const panel = getPanel(fix)!;
      expect(panel.className).toContain('w-80');
      expect(panel.className).toContain('right-0');
    });

    it('applies height for bottom placement', async () => {
      const fix = await setup();

      fix.componentInstance.placement.set('bottom');
      fix.detectChanges(false);

      const panel = getPanel(fix)!;
      expect(panel.className).toContain('h-80');
      expect(panel.className).toContain('bottom-0');
    });
  });

  describe('Slot hooks', () => {
    it('applies backdrop slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({ backdrop: 'fixed inset-0 bg-black/60' });
      fix.detectChanges(false);

      const backdrop = getBackdrop(fix)!;
      expect(backdrop.className).toContain('bg-black/60');
    });

    it('applies panel slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({ panel: 'border-l border-border' });
      fix.detectChanges(false);

      const panel = getPanel(fix)!;
      expect(panel.className).toContain('border-l');
      expect(panel.className).toContain('border-border');
    });

    it('applies size slot for left placement', async () => {
      const fix = await setup();

      fix.componentInstance.placement.set('left');
      fix.componentInstance.slot.set({ size: 'w-72' });
      fix.detectChanges(false);

      const panel = getPanel(fix)!;
      expect(panel.className).toContain('w-72');
    });

    it('applies height slot for bottom placement', async () => {
      const fix = await setup();

      fix.componentInstance.placement.set('bottom');
      fix.componentInstance.slot.set({ height: 'h-48' });
      fix.detectChanges(false);

      const panel = getPanel(fix)!;
      expect(panel.className).toContain('h-48');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({});
      fix.detectChanges(false);

      const backdrop = getBackdrop(fix)!;
      const panel = getPanel(fix)!;

      expect(backdrop.className).toContain('fixed');
      expect(panel.className).toContain('bg-bg');
      expect(panel.className).toContain('w-80');
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