// menu.component.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TngMenu } from './menu.component';
import { TngMenuItem } from './menu-item.directive';
import { TngMenuTemplate } from './menu-template.directive';

const getContainer = (fix: ComponentFixture<unknown>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-menu > div')).nativeElement as HTMLDivElement;

const getTrigger = (fix: ComponentFixture<unknown>): HTMLButtonElement =>
  fix.debugElement.query(By.css('tng-menu button')).nativeElement as HTMLButtonElement;

@Component({
  standalone: true,
  imports: [TngMenu, TngMenuItem, TngMenuTemplate],
  template: `
    <tng-menu [slot]="slot">
      <button tngMenuTrigger type="button">Open</button>
      <ng-template tngMenuTemplate>
        <button tngMenuItem type="button" class="w-full rounded px-3 py-2 text-left text-sm">Item</button>
      </ng-template>
    </tng-menu>
  `,
})
class Host {
  slot: Record<string, string> = {};
}

describe('TngMenu', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);
    return fix;
  };

  describe('Rendering', () => {
    it('renders container and trigger', async () => {
      const fix = await setup();
      fix.detectChanges();
      const container = getContainer(fix);
      const trigger = getTrigger(fix);
      expect(container).toBeTruthy();
      expect(trigger).toBeTruthy();
      expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    });

    it('marks trigger with aria-expanded false when closed', async () => {
      const fix = await setup();
      fix.detectChanges();
      const trigger = getTrigger(fix);
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Base classes', () => {
    it('applies container base classes', async () => {
      const fix = await setup();
      fix.detectChanges();
      const container = getContainer(fix);
      expect(container.className).toContain('relative');
      expect(container.className).toContain('inline-block');
    });

    it('applies trigger base classes', async () => {
      const fix = await setup();
      fix.detectChanges();
      const trigger = getTrigger(fix);
      expect(trigger.className).toContain('inline-flex');
    });
  });

  describe('Slot hooks', () => {
    it('applies container slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot = { container: 'max-w-md' };
      fix.detectChanges();
      const container = getContainer(fix);
      expect(container.className).toContain('max-w-md');
    });

    it('applies trigger slot classes', async () => {
      const fix = await setup();
      fix.componentInstance.slot = { trigger: 'rounded-md bg-primary' };
      fix.detectChanges();
      const trigger = getTrigger(fix);
      expect(trigger.className).toContain('rounded-md');
      expect(trigger.className).toContain('bg-primary');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();
      fix.componentInstance.slot = {};
      fix.detectChanges();
      const container = getContainer(fix);
      expect(container.className).toContain('relative');
    });
  });

  describe('Interaction', () => {
    it('sets aria-expanded true when trigger clicked', async () => {
      const fix = await setup();
      fix.detectChanges();
      const trigger = getTrigger(fix);
      trigger.click();
      fix.detectChanges();
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('toggles closed when trigger clicked again', async () => {
      const fix = await setup();
      fix.detectChanges();
      const trigger = getTrigger(fix);
      trigger.click();
      fix.detectChanges();
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      trigger.click();
      fix.detectChanges();
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
