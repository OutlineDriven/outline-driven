import { describe, test, expect } from 'bun:test';
import { getHostConfig } from '../src/hosts/detect.js';

describe('getHostConfig', () => {
  test('claude user scope returns ~/.claude/CLAUDE.md', () => {
    const cfg = getHostConfig('claude', 'user');
    expect(cfg.targetPath).toContain('.claude/CLAUDE.md');
    expect(cfg.host).toBe('claude');
  });

  test('claude project scope returns ./CLAUDE.md', () => {
    const cfg = getHostConfig('claude', 'project');
    expect(cfg.targetPath).toBe('./CLAUDE.md');
  });

  test('unknown host falls back to claude', () => {
    const cfg = getHostConfig('unknown-host', 'user');
    expect(cfg.host).toBe('claude');
  });
});
