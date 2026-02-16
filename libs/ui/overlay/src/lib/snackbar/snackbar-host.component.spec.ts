import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TngSnackbarHost } from './snackbar-host.component';
import type { TngSnackbarItem } from './snackbar.types';

const getHost = (fix: ComponentFixture<Host>): HTMLDivElement | null =>
  fix.nativeElement.querySelector('tng-snackbar-host > div') as HTMLDivElement | null;

const getItems = (fix: ComponentFixture<Host>): HTMLDivElement[] =>
  Array.from(fix.nativeElement.querySelectorAll('tng-snackbar-host > div > div')) as HTMLDivElement[];

@Component({
  standalone: true,
  imports: [TngSnackbarHost],
  template: `
    <tng-snackbar-host
      [items]="items()"
      [position]="position()"
      [slot]="slot()"
      (dismiss)="onDismiss($event)"
    />
  `,
})
class Host {
  items = signal<TngSnackbarItem[]>([
    { id: '1', message: 'Test message' },
    { id: '2', message: 'With action', actionLabel: 'Undo' },
  ]);
  position = signal<'bottom-center'>('bottom-center');
  slot = signal<Record<string, string>>({});
  onDismiss = () => {};
}

describe('TngSnackbarHost', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    fix.detectChanges();
    return fix;
  };

  describe('Rendering', () => {
    it('renders host when items exist', async () => {
      const fix = await setup();
      const host = getHost(fix);
      expect(host).toBeTruthy();
    });

    it('renders items', async () => {
      const fix = await setup();
      const items = getItems(fix);
      expect(items.length).toBe(2);
    });

    it('renders message text', async () => {
      const fix = await setup();
      expect(fix.nativeElement.textContent).toContain('Test message');
      expect(fix.nativeElement.textContent).toContain('With action');
    });

    it('does not render when items is empty', async () => {
      const fix = await setup();
      fix.componentInstance.items.set([]);
      fix.detectChanges();
      expect(getHost(fix)).toBeNull();
    });
  });

  describe('Base classes', () => {
    it('applies host base classes', async () => {
      const fix = await setup();
      const host = getHost(fix)!;
      expect(host.className).toContain('fixed');
      expect(host.className).toContain('flex');
    });

    it('applies item base classes', async () => {
      const fix = await setup();
      const items = getItems(fix);
      expect(items[0].className).toContain('pointer-events-auto');
      expect(items[0].className).toContain('rounded-md');
    });
  });

  describe('Slot hooks', () => {
    it('applies host slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ host: 'gap-4' });
      fix.detectChanges();
      const host = getHost(fix)!;
      expect(host.className).toContain('gap-4');
    });

    it('applies item slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({ item: 'rounded-xl border-2' });
      fix.detectChanges();
      const items = getItems(fix);
      expect(items[0].className).toContain('rounded-xl');
      expect(items[0].className).toContain('border-2');
    });

    it('applies intentSuccess slot when item has intent success', async () => {
      const fix = await setup();
      fix.componentInstance.items.set([{ id: '1', message: 'Success', intent: 'success' }]);
      fix.componentInstance.slot.set({ intentSuccess: 'border-green-500' });
      fix.detectChanges();
      const items = getItems(fix);
      expect(items[0].className).toContain('border-green-500');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();
      fix.componentInstance.slot.set({});
      fix.detectChanges();
      const host = getHost(fix)!;
      expect(host.className).toContain('fixed');
    });
  });

  describe('Interaction', () => {
    it('emits dismiss when dismiss button is clicked', async () => {
      const fix = await setup();
  
      const emitSpy = jest.spyOn(fix.componentInstance, 'onDismiss');
  
      const firstItem = getItems(fix)[0];
      const dismissBtn = firstItem.querySelector(
        'button[aria-label="Dismiss"]',
      ) as HTMLButtonElement;
  
      dismissBtn.click();
      fix.detectChanges();
  
      expect(emitSpy).toHaveBeenCalledWith({ id: '1', reason: 'dismiss' });
    });
  });
});
