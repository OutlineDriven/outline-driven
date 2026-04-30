import { describe, test, expect } from 'bun:test';

// Smoke test: init module exports runInit
describe('runInit', () => {
  test('exports runInit function', async () => {
    const mod = await import('../src/commands/init.js');
    expect(typeof mod.runInit).toBe('function');
  });
});
