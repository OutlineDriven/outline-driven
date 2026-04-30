#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { runInit } from './commands/init.js';
import { runDoctor } from './commands/doctor.js';
import { runUpdate } from './commands/update.js';
import { runUninstall } from './commands/uninstall.js';

const USAGE = `outline-driven <command> [options]

Commands:
  init        Bootstrap Outline-Driven Development (dry-run by default)
  doctor      Verify setup health (not yet implemented)
  update      Pull latest release (not yet implemented)
  uninstall   Clean removal (not yet implemented)

Options:
  --help      Show help
  --version   Show version
`;

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(USAGE);
    process.exit(0);
  }

  if (args[0] === '--version' || args[0] === '-v') {
    const { readVersion } = await import('./lib/version.js');
    console.log(readVersion());
    process.exit(0);
  }

  const [command, ...rest] = args;

  switch (command) {
    case 'init':
      await runInit(rest);
      break;
    case 'doctor':
      await runDoctor(rest);
      break;
    case 'update':
      await runUpdate(rest);
      break;
    case 'uninstall':
      await runUninstall(rest);
      break;
    default:
      console.error(`Unknown command: ${command}\n`);
      console.log(USAGE);
      process.exit(1);
  }
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
