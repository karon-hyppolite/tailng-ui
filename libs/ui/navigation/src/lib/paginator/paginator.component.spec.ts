// paginator.component.spec.ts
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TngPaginator } from './paginator.component';

const getRoot = (fix: ComponentFixture<unknown>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-paginator > div')).nativeElement as HTMLDivElement;

const getLeft = (fix: ComponentFixture<unknown>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-paginator > div > div:first-child')).nativeElement as HTMLDivElement;

const getRight = (fix: ComponentFixture<unknown>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-paginator > div > div:last-child')).nativeElement as HTMLDivElement;

const getAllButtons = (fix: ComponentFixture<unknown>): HTMLButtonElement[] =>
  fix.debugElement
    .queryAll(By.css('tng-paginator button'))
    .map((el) => el.nativeElement as HTMLButtonElement);

/** Page number buttons only (filter out « ‹ › ») */
const getPageButtons = (fix: ComponentFixture<unknown>): HTMLButtonElement[] =>
  getAllButtons(fix).filter((b) => {
    const t = (b.textContent ?? '').trim();
    return /^\d+$/.test(t);
  });

const getActivePageButton = (fix: ComponentFixture<unknown>): HTMLButtonElement | undefined =>
  getPageButtons(fix).find((b) => b.getAttribute('aria-current') === 'page');

@Component({
  standalone: true,
  imports: [TngPaginator],
  template: `
    <tng-paginator
      [count]="count()"
      [page]="page()"
      [pageSize]="pageSize()"
      [hidePageSize]="hidePageSize()"
      [slot]="slot()"
      (change)="onChange($event)"
    />
  `,
})
class Host {
  count = signal(100);
  page = signal(1);
  pageSize = signal(10);
  hidePageSize = signal(true);
  slot = signal<Record<string, string>>({});

  onChange = jest.fn();
}

describe('TngPaginator', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    fix.detectChanges(false);
    return fix;
  };

  describe('Rendering', () => {
    it('renders root, left and right sections', async () => {
      const fix = await setup();

      expect(getRoot(fix)).toBeTruthy();
      expect(getLeft(fix)).toBeTruthy();
      expect(getLeft(fix).textContent).toContain('Showing');
      expect(getRight(fix)).toBeTruthy();
    });

    it('renders navigation buttons', async () => {
      const fix = await setup();
      expect(getAllButtons(fix).length).toBeGreaterThanOrEqual(4);
    });

    it('shows range text when count > 0', async () => {
      const fix = await setup();
      const left = getLeft(fix);

      expect(left.textContent).toContain('1');
      expect(left.textContent).toContain('10');
      expect(left.textContent).toContain('100');
    });
  });

  describe('Base classes', () => {
    it('applies root base classes', async () => {
      const fix = await setup();
      const root = getRoot(fix);

      expect(root.className).toContain('flex');
      expect(root.className).toContain('flex-wrap');
    });

    it('applies left base classes', async () => {
      const fix = await setup();
      expect(getLeft(fix).className).toContain('text-muted-foreground');
    });

    it('applies right base classes', async () => {
      const fix = await setup();
      expect(getRight(fix).className).toContain('flex');
    });
  });

  describe('Slot hooks', () => {
    it('applies container slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({ container: 'max-w-xl' });
      fix.detectChanges(false);

      expect(getRoot(fix).className).toContain('max-w-xl');
    });

    it('applies left slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({ left: 'text-primary' });
      fix.detectChanges(false);

      expect(getLeft(fix).className).toContain('text-primary');
    });

    it('applies page and activePage slot classes', async () => {
      const fix = await setup();

      // Ensure multiple pages exist + page 1 is active
      fix.componentInstance.count.set(100);
      fix.componentInstance.page.set(1);

      fix.componentInstance.slot.set({
        page: 'rounded-full',
        activePage: 'bg-blue-500',
      });
      fix.detectChanges(false);

      const activeBtn = getActivePageButton(fix);
      expect(activeBtn).toBeTruthy();

      // base page class + active class should both be present
      expect(activeBtn!.className).toContain('rounded-full');
      expect(activeBtn!.className).toContain('bg-blue-500');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();

      fix.componentInstance.slot.set({});
      fix.detectChanges(false);

      expect(getRoot(fix).className).toContain('flex');
    });
  });

  describe('Interaction', () => {
    it('emits change when page button is clicked', async () => {
      const fix = await setup();

      const emitSpy = jest.spyOn(fix.componentInstance, 'onChange');

      // click page "2"
      const page2 = getPageButtons(fix).find((b) => (b.textContent ?? '').trim() === '2');
      expect(page2).toBeTruthy();

      page2!.click();
      fix.detectChanges(false);

      expect(emitSpy).toHaveBeenCalled();
      // (optional) stricter: expect payload
      // expect(emitSpy).toHaveBeenCalledWith(expect.objectContaining({ page: 2, pageSize: 10, skip: 10 }));
    });

    it('sets aria-current on active page', async () => {
      const fix = await setup();

      const activeBtn = getActivePageButton(fix);
      expect(activeBtn).toBeTruthy();
      expect((activeBtn!.textContent ?? '').trim()).toBe('1');
    });

    it('disables first/prev when on page 1', async () => {
      const fix = await setup();

      fix.componentInstance.page.set(1);
      fix.detectChanges(false);

      const buttons = getAllButtons(fix);
      const first = buttons.find((b) => (b.textContent ?? '').trim() === '«');
      const prev = buttons.find((b) => (b.textContent ?? '').trim() === '‹');

      expect(first).toBeTruthy();
      expect(prev).toBeTruthy();

      expect(first!.disabled).toBe(true);
      expect(prev!.disabled).toBe(true);
    });
  });
});