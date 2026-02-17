import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TngEmptyState } from './empty-state.component';

const getContainer = (fix: ComponentFixture<Host>): HTMLElement | null =>
  fix.nativeElement.querySelector('tng-empty-state > div') as HTMLElement | null;

const getIconEl = (fix: ComponentFixture<Host>): HTMLElement | null =>
  fix.nativeElement.querySelector('tng-empty-state > div > div:first-child') as HTMLElement | null;

const getTitleEl = (fix: ComponentFixture<Host>): HTMLHeadingElement | null =>
  fix.nativeElement.querySelector('tng-empty-state h3') as HTMLHeadingElement | null;

const getMessageEl = (fix: ComponentFixture<Host>): HTMLParagraphElement | null =>
  fix.nativeElement.querySelector('tng-empty-state p') as HTMLParagraphElement | null;

@Component({
  standalone: true,
  imports: [TngEmptyState],
  template: `
    <tng-empty-state
      [title]="title"
      [message]="message"
      [icon]="icon"
      [slot]="slot()"
    />
  `,
})
class Host {
  title = 'No data available';
  message = '';
  icon = '';
  slot = (): Record<string, string> => ({});
}

describe('TngEmptyState', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async (overrides?: Partial<Host>) => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    if (overrides) {
      Object.assign(fix.componentInstance, overrides);
    }
    fix.detectChanges();
    return fix;
  };

  describe('Rendering', () => {
    it('renders default title when no inputs set', async () => {
      const fix = await setup();
      const title = getTitleEl(fix);
      expect(title).toBeTruthy();
      expect(title?.textContent?.trim()).toBe('No data available');
    });

    it('renders custom title', async () => {
      const fix = await setup({ title: 'No items found' });
      const title = getTitleEl(fix);
      expect(title?.textContent?.trim()).toBe('No items found');
    });

    it('does not render message element when message is empty', async () => {
      const fix = await setup();
      expect(getMessageEl(fix)).toBeNull();
    });

    it('renders message when message is set', async () => {
      const fix = await setup({ message: 'Try again later.' });
      const msg = getMessageEl(fix);
      expect(msg).toBeTruthy();
      expect(msg?.textContent?.trim()).toBe('Try again later.');
    });

    it('does not render icon when icon is empty', async () => {
      const fix = await setup();
      // First child of container should be h3 (title), not icon div
      const container = getContainer(fix);
      expect(container?.firstElementChild?.tagName).toBe('H3');
    });

    it('renders icon when icon is set', async () => {
      const fix = await setup({ icon: '📭' });
      const iconEl = getIconEl(fix);
      expect(iconEl).toBeTruthy();
      expect(iconEl?.textContent?.trim()).toBe('📭');
    });
  });

  describe('Base classes', () => {
    it('applies container base classes', async () => {
      const fix = await setup();
      const container = getContainer(fix)!;
      expect(container.className).toContain('flex');
      expect(container.className).toContain('flex-col');
      expect(container.className).toContain('p-8');
      expect(container.className).toContain('text-center');
    });

    it('applies title base classes', async () => {
      const fix = await setup();
      const title = getTitleEl(fix)!;
      expect(title.className).toContain('text-lg');
      expect(title.className).toContain('font-semibold');
    });

    it('applies message base classes when message is set', async () => {
      const fix = await setup({ message: 'Hello' });
      const msg = getMessageEl(fix)!;
      expect(msg.className).toContain('text-sm');
    });

    it('applies icon base classes when icon is set', async () => {
      const fix = await setup({ icon: '📭' });
      const iconEl = getIconEl(fix)!;
      expect(iconEl.className).toContain('mb-4');
      expect(iconEl.className).toContain('text-4xl');
    });
  });

  describe('Slot hooks', () => {
    it('applies container slot classes', async () => {
      const fix = await setup({
        slot: () => ({ container: 'min-h-48 bg-alternate-background rounded-lg' }),
      });
      fix.detectChanges();
      const container = getContainer(fix)!;
      expect(container.className).toContain('min-h-48');
      expect(container.className).toContain('bg-alternate-background');
      expect(container.className).toContain('rounded-lg');
    });

    it('merges container base classes with slot classes', async () => {
      const fix = await setup({
        slot: () => ({ container: 'min-h-48' }),
      });
      fix.detectChanges();
      const container = getContainer(fix)!;
      expect(container.className).toContain('flex');
      expect(container.className).toContain('min-h-48');
    });

    it('applies icon slot classes when icon is set', async () => {
      const fix = await setup({
        icon: '📭',
        slot: () => ({ icon: 'text-5xl text-primary/60' }),
      });
      fix.detectChanges();
      const iconEl = getIconEl(fix)!;
      expect(iconEl.className).toContain('text-5xl');
      expect(iconEl.className).toContain('text-primary/60');
    });

    it('applies title slot classes', async () => {
      const fix = await setup({
        slot: () => ({ title: 'text-xl font-bold text-primary' }),
      });
      fix.detectChanges();
      const title = getTitleEl(fix)!;
      expect(title.className).toContain('text-xl');
      expect(title.className).toContain('font-bold');
      expect(title.className).toContain('text-primary');
    });

    it('applies message slot classes when message is set', async () => {
      const fix = await setup({
        message: 'No results.',
        slot: () => ({ message: 'max-w-sm italic' }),
      });
      fix.detectChanges();
      const msg = getMessageEl(fix)!;
      expect(msg.className).toContain('max-w-sm');
      expect(msg.className).toContain('italic');
    });

    it('handles empty slot object', async () => {
      const fix = await setup({ slot: () => ({}) });
      fix.detectChanges();
      const container = getContainer(fix)!;
      expect(container.className).toContain('flex');
    });
  });
});
