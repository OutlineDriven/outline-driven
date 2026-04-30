import { parseArgs } from 'node:util';
import { detectHost } from '../hosts/detect.js';
import { getHostConfig } from '../hosts/detect.js';
import { print, printError, printSuccess } from '../lib/ui.js';
import { safeWrite } from '../lib/fs.js';
import { readVersion } from '../lib/version.js';

const INIT_USAGE = `outline-driven init [options]

Options:
  --host <claude|codex|gemini|opencode|auto>  Target host (default: auto-detect)
  --scope <user|project>                       Install scope (default: user)
  --apply                                      Apply changes (default: dry-run)
  --help                                       Show help
`;

export async function runInit(args: string[]): Promise<void> {
  const { values } = parseArgs({
    args,
    options: {
      host: { type: 'string', default: 'auto' },
      scope: { type: 'string', default: 'user' },
      apply: { type: 'boolean', default: false },
      help: { type: 'boolean', default: false },
    },
    strict: true,
  });

  if (values.help) {
    console.log(INIT_USAGE);
    return;
  }

  const scope = values.scope as 'user' | 'project';
  if (scope !== 'user' && scope !== 'project') {
    printError(`Invalid --scope: ${scope}. Must be 'user' or 'project'.`);
    process.exit(1);
  }

  const apply = values.apply ?? false;
  const dryRun = !apply;

  if (dryRun) {
    print('Dry-run mode. Pass --apply to write files.\n');
  }

  // Resolve host: env override > flag > auto-detect
  const envHost = process.env['OUTLINE_DRIVEN_HOST'];
  const hostArg = envHost ?? (values.host === 'auto' ? null : (values.host ?? null));
  const host = hostArg ?? await detectHost();

  print(`Host: ${host}`);
  print(`Scope: ${scope}`);
  print(`Mode: ${dryRun ? 'dry-run' : 'apply'}\n`);

  const config = getHostConfig(host, scope);

  print(`Files to write:`);
  print(`  ${config.targetPath}`);

  if (!dryRun) {
    // TODO(W5): fetch and verify release tarball, then copy prompt file
    // For now, write a bootstrap comment directing to the methodology
    const content = [
      `# Outline-Driven Development`,
      `# See: https://outlinedriven.github.io`,
      `# Methodology: https://github.com/OutlineDriven/outline-driven-development`,
      `# Version: ${readVersion()}`,
      ``,
      `# Full prompt content will be installed from the canonical release artifact.`,
      `# Run: npx outline-driven update --apply`,
    ].join('\n');

    await safeWrite(config.targetPath, content);
    printSuccess(`Written: ${config.targetPath}`);
  } else {
    print(`\n[Dry-run] Would write to: ${config.targetPath}`);
    print(`[Dry-run] Content: bootstrap header + methodology references`);
    print(`\nTo apply: npx outline-driven init --apply`);
  }
}
