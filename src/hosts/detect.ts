import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { homedir } from 'node:os';
import { join } from 'node:path';

const exec = promisify(execFile);

export type Host = 'claude' | 'codex' | 'gemini' | 'opencode';

export interface HostConfig {
  host: Host;
  targetPath: string;
  promptFile: string;
}

async function binaryExists(bin: string): Promise<boolean> {
  try {
    await exec('which', [bin]);
    return true;
  } catch {
    return false;
  }
}

export async function detectHost(): Promise<Host> {
  const candidates: Host[] = ['claude', 'codex', 'gemini', 'opencode'];
  for (const host of candidates) {
    if (await binaryExists(host)) return host;
  }
  // Default to claude if nothing detected
  return 'claude';
}

export function getHostConfig(host: Host | string, scope: 'user' | 'project'): HostConfig {
  const home = homedir();
  const configs: Record<Host, { user: string; project: string; promptFile: string }> = {
    claude:   { user: join(home, '.claude', 'CLAUDE.md'),          project: './CLAUDE.md',    promptFile: 'prompts/COMPACT_PROMPT.md' },
    codex:    { user: join(home, '.codex', 'AGENTS.md'),           project: './AGENTS.md',    promptFile: 'prompts/COMPACT_PROMPT.md' },
    gemini:   { user: join(home, '.gemini', 'GEMINI.md'),          project: './GEMINI.md',    promptFile: 'prompts/COMPACT_PROMPT.md' },
    opencode: { user: join(home, '.config', 'opencode', 'AGENTS.md'), project: './AGENTS.md', promptFile: 'prompts/COMPACT_PROMPT.md' },
  };

  const safeHost = (host as Host) in configs ? (host as Host) : 'claude';
  const cfg = configs[safeHost]!;
  return {
    host: safeHost,
    targetPath: scope === 'user' ? cfg.user : cfg.project,
    promptFile: cfg.promptFile,
  };
}
