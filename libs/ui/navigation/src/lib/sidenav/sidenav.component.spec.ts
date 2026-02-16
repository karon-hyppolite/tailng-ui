// sidenav.component.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TngSidenav } from './sidenav.component';
import { TngSidenavFooterSlot, TngSidenavHeaderSlot } from './sidenav-slots.directive';

const getNav = (fix: ComponentFixture<unknown>): HTMLElement =>
  fix.debugElement.query(By.css('tng-sidenav nav')).nativeElement as HTMLElement;

const getContentDiv = (fix: ComponentFixture<unknown>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-sidenav nav > div:nth-child(2)')).nativeElement as HTMLDivElement;

const getFooterDiv = (fix: ComponentFixture<unknown>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-sidenav nav > div:last-child')).nativeElement as HTMLDivElement;

@Component({
  standalone: true,
  imports: [TngSidenav, TngSidenavHeaderSlot, TngSidenavFooterSlot],
  template: `
    <tng-sidenav [collapsed]="collapsed" [slot]="slot">
      <div tngSidenavHeader>Header</div>
      <div class="p-2">Content</div>
      <div tngSidenavFooter>Footer</div>
    </tng-sidenav>
  `,
})
class Host {
  collapsed = false;
  slot: Record<string, string> = {};
}

describe('TngSidenav', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    return fix;
  };

  describe('Rendering', () => {
    it('renders nav with aria-label', async () => {
      const fix = await setup();
      fix.detectChanges();
      const nav = getNav(fix);
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Primary navigation');
    });

    it('sets data-collapsed when collapsed', async () => {
      const fix = await setup();
      fix.componentInstance.collapsed = true;
      fix.detectChanges();
      const nav = getNav(fix);
      expect(nav.getAttribute('data-collapsed')).toBe('true');
    });

    it('sets data-collapsed false when expanded', async () => {
      const fix = await setup();
      fix.detectChanges();
      const nav = getNav(fix);
      expect(nav.getAttribute('data-collapsed')).toBe('false');
    });
  });

  describe('Base classes', () => {
    it('applies container base classes', async () => {
      const fix = await setup();
      fix.detectChanges();
      const nav = getNav(fix);
      expect(nav.className).toContain('group');
      expect(nav.className).toContain('h-full');
      expect(nav.className).toContain('flex');
      expect(nav.className).toContain('flex-col');
    });

    it('applies expanded width when not collapsed', async () => {
      const fix = await setup();
      fix.detectChanges();
      const nav = getNav(fix);
      expect(nav.className).toContain('w-64');
    });

    it('applies collapsed width when collapsed', async () => {
      const fix = await setup();
      fix.componentInstance.collapsed = true;
      fix.detectChanges();
      const nav = getNav(fix);
      expect(nav.className).toContain('w-16');
    });

    it('applies content classes', async () => {
      const fix = await setup();
      fix.detectChanges();
      const content = getContentDiv(fix);
      expect(content.className).toContain('flex-1');
      expect(content.className).toContain('overflow-auto');
    });

    it('applies footer classes', async () => {
      const fix = await setup();
      fix.detectChanges();
      const footer = getFooterDiv(fix);
      expect(footer.className).toContain('border-t');
    });
  });

  describe('Slot hooks', () => {
    it('applies container slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot = { container: 'max-w-md' };
      fix.detectChanges();
      const nav = getNav(fix);
      expect(nav.className).toContain('max-w-md');
    });

    it('applies expanded slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot = { expanded: 'w-72' };
      fix.detectChanges();
      const nav = getNav(fix);
      expect(nav.className).toContain('w-72');
    });

    it('applies collapsed slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.collapsed = true;
      fix.componentInstance.slot = { collapsed: 'w-12' };
      fix.detectChanges();
      const nav = getNav(fix);
      expect(nav.className).toContain('w-12');
    });

    it('applies content slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot = { content: 'overflow-y-auto' };
      fix.detectChanges();
      const content = getContentDiv(fix);
      expect(content.className).toContain('overflow-y-auto');
    });

    it('applies footer slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot = { footer: 'border-t-2' };
      fix.detectChanges();
      const footer = getFooterDiv(fix);
      expect(footer.className).toContain('border-t-2');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();
      fix.componentInstance.slot = {};
      fix.detectChanges();
      const nav = getNav(fix);
      expect(nav.className).toContain('group');
      expect(nav.className).toContain('w-64');
    });
  });
});
