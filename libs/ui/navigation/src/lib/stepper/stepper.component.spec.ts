// stepper.component.spec.ts
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TngStepper } from './stepper.component';
import { TngStep } from './step.component';
import { TngStepPanel } from './step-panel.component';

const getRoot = (fix: ComponentFixture<unknown>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-stepper > div')).nativeElement as HTMLDivElement;

const getHeader = (fix: ComponentFixture<unknown>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-stepper [role="tablist"]')).nativeElement as HTMLDivElement;

const getPanelWrap = (fix: ComponentFixture<unknown>): HTMLDivElement =>
  fix.debugElement.query(By.css('tng-stepper > div > div:last-child'))
    .nativeElement as HTMLDivElement;

const getSteps = (fix: ComponentFixture<unknown>) =>
  fix.debugElement.queryAll(By.directive(TngStep));

@Component({
  standalone: true,
  imports: [TngStepper, TngStep, TngStepPanel],
  template: `
    <tng-stepper
      [activeIndex]="activeIndex()"
      (activeIndexChange)="onChange($event)"
      [orientation]="orientation()"
      [slot]="stepperSlot()"
    >
      <tng-step [slot]="stepSlot()">One</tng-step>
      <tng-step [slot]="stepSlot()">Two</tng-step>

      <tng-step-panel [index]="0"><div>Panel 1</div></tng-step-panel>
      <tng-step-panel [index]="1"><div>Panel 2</div></tng-step-panel>
    </tng-stepper>
  `,
})
class Host {
  activeIndex = signal<number | null>(0);
  orientation = signal<'horizontal' | 'vertical'>('horizontal');

  stepperSlot = signal<Record<string, string>>({});
  stepSlot = signal<Record<string, string>>({});

  onChange = jest.fn();
}

describe('TngStepper', () => {
  afterEach(() => TestBed.resetTestingModule());

  const setup = async () => {
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    const fix = TestBed.createComponent(Host);

    // IMPORTANT: avoid NG0100 for signal/effect-driven components
    fix.detectChanges(false);

    return fix;
  };

  describe('Rendering', () => {
    it('renders root, header and panel wrap', async () => {
      const fix = await setup();

      const root = getRoot(fix);
      const header = getHeader(fix);
      const panelWrap = getPanelWrap(fix);

      expect(root).toBeTruthy();
      expect(header).toBeTruthy();
      expect(header.getAttribute('role')).toBe('tablist');
      expect(header.getAttribute('aria-orientation')).toBe('horizontal');
      expect(panelWrap).toBeTruthy();
    });

    it('renders steps', async () => {
      const fix = await setup();
      expect(getSteps(fix).length).toBe(2);
    });

    it('sets aria-orientation vertical when orientation is vertical', async () => {
      const fix = await setup();

      fix.componentInstance.orientation.set('vertical');
      fix.detectChanges(false);

      expect(getHeader(fix).getAttribute('aria-orientation')).toBe('vertical');
    });
  });

  describe('Base classes', () => {
    it('applies root base classes', async () => {
      const fix = await setup();
      expect(getRoot(fix).className).toContain('w-full');
    });

    it('applies header base classes for horizontal', async () => {
      const fix = await setup();
      const header = getHeader(fix);
      expect(header.className).toContain('flex');
      expect(header.className).toContain('gap-2');
    });

    it('applies panelWrap base classes', async () => {
      const fix = await setup();
      expect(getPanelWrap(fix).className).toContain('pt-4');
    });

    it('applies headerVertical classes when orientation is vertical', async () => {
      const fix = await setup();

      fix.componentInstance.orientation.set('vertical');
      fix.detectChanges(false);

      expect(getHeader(fix).className).toContain('flex-col');
    });
  });

  describe('Slot hooks', () => {
    it('applies root slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.stepperSlot.set({ root: 'max-w-2xl' });
      fix.detectChanges(false);

      expect(getRoot(fix).className).toContain('max-w-2xl');
    });

    it('applies header slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.stepperSlot.set({ header: 'inline-flex gap-1' });
      fix.detectChanges(false);

      const header = getHeader(fix);
      expect(header.className).toContain('inline-flex');
      expect(header.className).toContain('gap-1');
    });

    it('applies headerVertical slot when orientation vertical', async () => {
      const fix = await setup();

      fix.componentInstance.orientation.set('vertical');
      fix.componentInstance.stepperSlot.set({ headerVertical: 'flex flex-col gap-4' });
      fix.detectChanges(false);

      expect(getHeader(fix).className).toContain('gap-4');
    });

    it('applies panelWrap slot classes', async () => {
      const fix = await setup();

      fix.componentInstance.stepperSlot.set({ panelWrap: 'pt-8' });
      fix.detectChanges(false);

      expect(getPanelWrap(fix).className).toContain('pt-8');
    });

    it('applies step slot classes (active step)', async () => {
      const fix = await setup();

      // ensure first step is active
      fix.componentInstance.activeIndex.set(0);
      fix.componentInstance.stepSlot.set({
        step: 'rounded-lg px-4',
        active: 'bg-blue-500',
      });
      fix.detectChanges(false);

      const steps = getSteps(fix);
      const firstStep = steps[0].nativeElement as HTMLElement;

      expect(firstStep.className).toContain('rounded-lg');
      expect(firstStep.className).toContain('bg-blue-500');
    });

    it('handles empty slot object', async () => {
      const fix = await setup();

      fix.componentInstance.stepperSlot.set({});
      fix.detectChanges(false);

      expect(getRoot(fix).className).toContain('w-full');
    });
  });

  describe('Interaction', () => {
    it('emits activeIndexChange when step is clicked', async () => {
      const fix = await setup();

      const steps = getSteps(fix);
      (steps[1].nativeElement as HTMLElement).click();
      fix.detectChanges(false);

      expect(fix.componentInstance.onChange).toHaveBeenCalledWith(1);
    });

    it('sets aria-selected on active step', async () => {
      const fix = await setup();

      const steps = getSteps(fix);
      const firstStep = steps[0].nativeElement as HTMLElement;
      const secondStep = steps[1].nativeElement as HTMLElement;

      expect(firstStep.getAttribute('aria-selected')).toBe('true');
      expect(secondStep.getAttribute('aria-selected')).toBe('false');
    });
  });
});