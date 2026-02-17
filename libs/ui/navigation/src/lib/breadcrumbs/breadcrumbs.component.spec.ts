import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { TngBreadcrumbs } from './breadcrumbs.component';
import type { TngBreadcrumbItem } from './breadcrumbs.component';

const getNav = (fix: ComponentFixture<unknown>): HTMLElement =>
  fix.debugElement.query(By.css('tng-breadcrumbs nav')).nativeElement as HTMLElement;

const getList = (fix: ComponentFixture<unknown>): HTMLOListElement =>
  fix.debugElement.query(By.css('tng-breadcrumbs ol')).nativeElement as HTMLOListElement;

const getItems = (fix: ComponentFixture<unknown>): HTMLLIElement[] =>
  fix.debugElement
    .queryAll(By.css('tng-breadcrumbs li'))
    .map((el) => el.nativeElement as HTMLLIElement);

@Component({
  standalone: true,
  imports: [TngBreadcrumbs],
  template: `
    <tng-breadcrumbs
      [items]="items()"
      [home]="home()"
      [separator]="separator()"
      [slot]="slot()"
    />
  `,
})
class Host {
  items = signal<TngBreadcrumbItem[]>([
    { label: 'Home', route: '/' },
    { label: 'Docs', route: '/docs' },
    { label: 'Breadcrumbs' },
  ]);

  home = signal<TngBreadcrumbItem | null>(null);
  separator = signal('/');
  slot = signal<Record<string, string>>({});
}

describe('TngBreadcrumbs', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideRouter([])],
    }).compileComponents();

    const fix = TestBed.createComponent(Host);
    // IMPORTANT: avoid NG0100 in signal-based setups
    fix.detectChanges(false);
    return fix;
  };

  describe('Rendering', () => {
    it('renders nav with aria-label', async () => {
      const fix = await setup();
      const nav = getNav(fix);
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
    });

    it('renders ordered list with items', async () => {
      const fix = await setup();
      expect(getList(fix)).toBeTruthy();
      expect(getItems(fix).length).toBe(3);
    });

    it('renders item labels', async () => {
      const fix = await setup();
      const items = getItems(fix);
      expect(items[0].textContent?.trim()).toContain('Home');
      expect(items[1].textContent?.trim()).toContain('Docs');
      expect(items[2].textContent?.trim()).toContain('Breadcrumbs');
    });

    it('prepends home when provided', async () => {
      const fix = await setup();

      fix.componentInstance.home.set({ label: '🏠', route: '/' });
      fix.detectChanges(false);

      const items = getItems(fix);
      expect(items.length).toBe(4);
      expect(items[0].textContent?.trim()).toContain('🏠');
    });
  });

  describe('Base classes', () => {
    it('applies root base classes', async () => {
      const fix = await setup();
      const nav = getNav(fix);
      expect(nav.className).toContain('flex');
      expect(nav.className).toContain('items-center');
    });

    it('applies list base classes', async () => {
      const fix = await setup();
      const list = getList(fix);
      expect(list.className).toContain('flex');
      expect(list.className).toContain('flex-wrap');
    });
  });

  describe('Slot hooks', () => {
    it('applies container slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({ container: 'text-base' });
      fix.detectChanges(false);

      expect(getNav(fix).className).toContain('text-base');
    });

    it('applies list slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({ list: 'gap-4' });
      fix.detectChanges(false);

      expect(getList(fix).className).toContain('gap-4');
    });

    it('applies link slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({ link: 'text-blue-600' });
      fix.detectChanges(false);

      const link = fix.debugElement.query(By.css('tng-breadcrumbs a'));
      expect(link?.nativeElement.className).toContain('text-blue-600');
    });

    it('applies current slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({ current: 'font-bold' });
      fix.detectChanges(false);

      const current = fix.debugElement.query(By.css('tng-breadcrumbs span[aria-current="page"]'));
      expect(current?.nativeElement.className).toContain('font-bold');
    });

    it('applies separator slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({ separator: 'text-primary' });
      fix.detectChanges(false);

      // separators are spans without aria-current, inside li (between items)
      const spans = fix.debugElement.queryAll(By.css('tng-breadcrumbs li span'));
      const sep = spans.find((el) => (el.nativeElement.textContent ?? '').trim() === '/');
      expect(sep?.nativeElement.className).toContain('text-primary');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({});
      fix.detectChanges(false);

      expect(getNav(fix).className).toContain('flex');
    });
  });

  describe('Semantics', () => {
    it('sets aria-current on current item', async () => {
      const fix = await setup();
      const current = fix.debugElement.query(By.css('tng-breadcrumbs span[aria-current="page"]'));
      expect(current).toBeTruthy();
      expect(current?.nativeElement.textContent?.trim()).toBe('Breadcrumbs');
    });
  });
});