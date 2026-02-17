// code-block.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TngCodeBlock } from './code-block.component';
import type { TngCodeBlockSlot } from './code-block.slots';

const getContainer = (fix: ComponentFixture<Host>): HTMLDivElement | null =>
  fix.nativeElement.querySelector('tng-code-block > div') as HTMLDivElement | null;

const getBody = (fix: ComponentFixture<Host>): HTMLDivElement | null =>
  fix.nativeElement.querySelector('tng-code-block > div > div') as HTMLDivElement | null;

const getGutter = (fix: ComponentFixture<Host>): HTMLDivElement | null =>
  fix.nativeElement.querySelector('tng-code-block div[aria-hidden="true"]') as HTMLDivElement | null;

const getPre = (fix: ComponentFixture<Host>): HTMLPreElement | null =>
  fix.nativeElement.querySelector('tng-code-block pre') as HTMLPreElement | null;

const getCode = (fix: ComponentFixture<Host>): HTMLElement | null =>
  fix.nativeElement.querySelector('tng-code-block code') as HTMLElement | null;

const getCopyWrapper = (fix: ComponentFixture<Host>): HTMLDivElement | null => {
  const copyButton = fix.nativeElement.querySelector('tng-code-block tng-copy-button');
  return (copyButton?.parentElement ?? null) as HTMLDivElement | null;
};

const getCopyButton = (fix: ComponentFixture<Host>): HTMLButtonElement | null =>
  fix.nativeElement.querySelector('tng-code-block tng-copy-button button') as HTMLButtonElement | null;

@Component({
  standalone: true,
  imports: [TngCodeBlock],
  template: `
    <tng-code-block
      [content]="content"
      [showLineNumbers]="showLineNumbers"
      [showCopy]="showCopy"
      [slot]="slot()"
    />
  `,
})
class Host {
  content = 'function hello() {\n  return "world";\n}';
  showLineNumbers = false;
  showCopy = true;
  slot = (): Partial<Record<TngCodeBlockSlot, string>> => ({});
}

describe('TngCodeBlock', () => {
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
    it('renders container, body, pre and code', async () => {
      const fix = await setup();
      expect(getContainer(fix)).toBeTruthy();
      expect(getBody(fix)).toBeTruthy();
      expect(getPre(fix)).toBeTruthy();
      expect(getCode(fix)).toBeTruthy();
    });

    it('renders code content (escaped when no highlighter)', async () => {
      const fix = await setup({ content: 'const x = 1;' });
      const code = getCode(fix)!;
      expect(code.textContent).toContain('const x = 1;');
    });

    it('renders gutter when showLineNumbers is true', async () => {
      const fix = await setup({ showLineNumbers: true });
      expect(getGutter(fix)).toBeTruthy();
    });

    it('does not render gutter when showLineNumbers is false', async () => {
      const fix = await setup({ showLineNumbers: false });
      expect(getGutter(fix)).toBeFalsy();
    });

    it('renders copy wrapper and button when showCopy is true', async () => {
      const fix = await setup({ showCopy: true });
      expect(getCopyWrapper(fix)).toBeTruthy();
      expect(getCopyButton(fix)).toBeTruthy();
    });

    it('does not render copy wrapper when showCopy is false', async () => {
      const fix = await setup({ showCopy: false });
      expect(getCopyWrapper(fix)).toBeFalsy();
      expect(getCopyButton(fix)).toBeFalsy();
    });
  });

  describe('Base classes', () => {
    it('applies container base classes', async () => {
      const fix = await setup();
      const el = getContainer(fix)!;
      expect(el.className).toContain('relative');
      expect(el.className).toContain('rounded-lg');
      expect(el.className).toContain('border');
      expect(el.className).toContain('bg-alternate-background');
    });

    it('applies body base classes', async () => {
      const fix = await setup();
      const el = getBody(fix)!;
      expect(el.className).toContain('relative');
    });

    it('applies pre base classes', async () => {
      const fix = await setup();
      const el = getPre(fix)!;
      expect(el.className).toContain('overflow-auto');
      expect(el.className).toContain('p-4');
      expect(el.className).toContain('text-xs');
      expect(el.className).toContain('whitespace-pre');
    });

    it('applies code base classes', async () => {
      const fix = await setup();
      const el = getCode(fix)!;
      expect(el.className).toContain('block');
    });

    it('applies copyWrapper base classes when showCopy is true', async () => {
      const fix = await setup({ showCopy: true });
      const el = getCopyWrapper(fix)!;
      expect(el.className).toContain('absolute');
      expect(el.className).toContain('top-2');
      expect(el.className).toContain('right-2');
    });

    it('applies gutter base classes when showLineNumbers is true', async () => {
      const fix = await setup({ showLineNumbers: true });
      const gutter = getGutter(fix)!;
      expect(gutter.className).toContain('absolute');
      expect(gutter.className).toContain('inset-y-0');
      expect(gutter.className).toContain('left-0');
      expect(gutter.className).toContain('w-10');
      expect(gutter.className).toContain('border-r');
    });

    it('applies pl-14 on pre when showLineNumbers is true', async () => {
      const fix = await setup({ showLineNumbers: true });
      const pre = getPre(fix)!;
      expect(pre.className).toContain('pl-14');
    });
  });

  describe('Slot hooks', () => {
    it('applies container slot classes', async () => {
      const fix = await setup({
        slot: () => ({ container: 'rounded-xl shadow-lg max-w-2xl' }),
      });
      fix.detectChanges();
      const el = getContainer(fix)!;
      expect(el.className).toContain('rounded-xl');
      expect(el.className).toContain('shadow-lg');
      expect(el.className).toContain('max-w-2xl');
    });

    it('merges container base with container slot', async () => {
      const fix = await setup({ slot: () => ({ container: 'rounded-xl' }) });
      fix.detectChanges();
      const el = getContainer(fix)!;
      expect(el.className).toContain('relative');
      expect(el.className).toContain('rounded-xl');
    });

    it('applies body slot classes', async () => {
      const fix = await setup({
        slot: () => ({ body: 'ring-2 ring-primary/30' }),
      });
      fix.detectChanges();
      const el = getBody(fix)!;
      expect(el.className).toContain('ring-2');
      expect(el.className).toContain('ring-primary/30');
    });

    it('applies gutter slot classes when showLineNumbers is true', async () => {
      const fix = await setup({
        showLineNumbers: true,
        slot: () => ({ gutter: '!text-primary/70' }),
      });
      fix.detectChanges();
      const el = getGutter(fix)!;
      expect(el.className).toContain('!text-primary/70');
    });

    it('applies pre slot classes', async () => {
      const fix = await setup({
        slot: () => ({ pre: 'text-sm bg-bg/50' }),
      });
      fix.detectChanges();
      const el = getPre(fix)!;
      expect(el.className).toContain('text-sm');
      expect(el.className).toContain('bg-bg/50');
    });

    it('applies code slot classes', async () => {
      const fix = await setup({
        slot: () => ({ code: 'font-mono text-sm' }),
      });
      fix.detectChanges();
      const el = getCode(fix)!;
      expect(el.className).toContain('font-mono');
      expect(el.className).toContain('text-sm');
    });

    it('applies copyWrapper slot classes when showCopy is true', async () => {
      const fix = await setup({
        showCopy: true,
        slot: () => ({ copyWrapper: 'top-3 right-3' }),
      });
      fix.detectChanges();
      const el = getCopyWrapper(fix)!;
      expect(el.className).toContain('top-3');
      expect(el.className).toContain('right-3');
    });

    it('handles empty slot object', async () => {
      const fix = await setup({ slot: () => ({}) });
      fix.detectChanges();
      const container = getContainer(fix)!;
      expect(container.className).toContain('relative');
    });
  });

  describe('Copy action', () => {
    it('copy button writes code content to clipboard when clicked', async () => {
      const fix = await setup({ content: 'hello world' });
      const btn = getCopyButton(fix)!;
      btn.click();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
    });
  });
});
