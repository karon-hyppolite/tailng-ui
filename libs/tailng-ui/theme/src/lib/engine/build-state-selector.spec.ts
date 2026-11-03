import { describe, expect, it } from 'vitest';
import { buildStateSelector } from './build-state-selector';
import { buttonStyleContract } from '../component-contracts/button.contract';

describe('buildStateSelector', () => {
  it('combines the slot class with the state selector', () => {
    expect(buildStateSelector(buttonStyleContract, 'root', 'disabled')).toBe(
      '.tng-button[data-disabled="true"]',
    );
  });

  it('returns null for states without a selector', () => {
    const contract = { slots: { root: 'x' }, states: {} };

    expect(buildStateSelector(contract, 'root', 'hover')).toBeNull();
  });
});
