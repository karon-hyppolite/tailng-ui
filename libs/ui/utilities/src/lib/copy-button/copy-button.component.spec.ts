// copy-button.component.spec.ts
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TngCopyButton } from './copy-button.component';

const getButton = (fix: ComponentFixture<Host>): HTMLButtonElement | null =>
  fix.nativeElement.querySelector('tng-copy-button button') as HTMLButtonElement | null;

const getContentSpan = (fix: ComponentFixture<Host>): HTMLSpanElement | null =>
  fix.nativeElement.querySelector('tng-copy-button button span') as HTMLSpanElement | null;

@Component({
  standalone: true,
  imports: [TngCopyButton],
  template: `
    <tng-copy-button
      [text]="text"
      [variant]="variant"
      [size]="size"
      [slot]="slot()"
    >
      <span>Copy</span>
      <span tngCopied>Copied</span>
    </tng-copy-button>
  `,
})
class Host {
  text = 'sample text';
  variant: 'ghost' | 'outline' | 'solid' = 'ghost';
  size: 'sm' | 'md' = 'sm';
  slot = (): Record<string, string> => ({});
}

describe('TngCopyButton', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
  });

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
    it('renders a button', async () => {
      const fix = await setup();
      expect(getButton(fix)).toBeTruthy();
    });

    it('renders default (non-copied) content', async () => {
      const fix = await setup();
      const span = getContentSpan(fix);
      expect(span?.textContent?.trim()).toBe('Copy');
    });


    it('shows copied content after click', async () => {
      const fix = await setup();
      const btn = getButton(fix)!;
    
      btn.click();
    
      await fix.whenStable();   // wait for clipboard promise
      fix.detectChanges();
    
      const span = getContentSpan(fix);
      expect(span?.textContent?.trim()).toBe('Copied');
    });
  });

  describe('Base classes', () => {
    it('applies root base classes (variant ghost, size sm)', async () => {
      const fix = await setup();
      const btn = getButton(fix)!;
      expect(btn.className).toContain('inline-flex');
      expect(btn.className).toContain('items-center');
      expect(btn.className).toContain('px-2');
      expect(btn.className).toContain('py-1');
      expect(btn.className).toContain('text-xs');
    });

    it('applies content wrapper base classes', async () => {
      const fix = await setup();
      const span = getContentSpan(fix)!;
      expect(span.className).toContain('inline-flex');
      expect(span.className).toContain('gap-1.5');
    });

    it('applies variant outline classes when variant is outline', async () => {
      const fix = await setup({ variant: 'outline' });
      const btn = getButton(fix)!;
      expect(btn.className).toContain('border');
    });

    it('applies size md classes when size is md', async () => {
      const fix = await setup({ size: 'md' });
      const btn = getButton(fix)!;
      expect(btn.className).toContain('px-3');
      expect(btn.className).toContain('py-1.5');
      expect(btn.className).toContain('text-sm');
    });
  });

  describe('Slot hooks', () => {
    it('applies container slot classes', async () => {
      const fix = await setup({
        slot: () => ({ container: 'rounded-xl shadow-md min-w-24' }),
      });
      fix.detectChanges();
      const btn = getButton(fix)!;
      expect(btn.className).toContain('rounded-xl');
      expect(btn.className).toContain('shadow-md');
      expect(btn.className).toContain('min-w-24');
    });

    it('merges container base classes with container slot classes', async () => {
      const fix = await setup({
        slot: () => ({ container: 'rounded-xl' }),
      });
      fix.detectChanges();
      const btn = getButton(fix)!;
      expect(btn.className).toContain('inline-flex');
      expect(btn.className).toContain('rounded-xl');
    });

    it('applies content slot classes', async () => {
      const fix = await setup({
        slot: () => ({ content: 'text-primary gap-2' }),
      });
      fix.detectChanges();
      const span = getContentSpan(fix)!;
      expect(span.className).toContain('text-primary');
      expect(span.className).toContain('gap-2');
    });

    it('handles empty slot object', async () => {
      const fix = await setup({ slot: () => ({}) });
      fix.detectChanges();
      const btn = getButton(fix)!;
      expect(btn.className).toContain('inline-flex');
    });
  });

  describe('Copy action', () => {
    it('calls clipboard.writeText with text input', async () => {
      const fix = await setup({ text: 'hello world' });
      const btn = getButton(fix)!;
      btn.click();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
    });
  });
});
