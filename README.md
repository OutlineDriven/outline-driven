# outline-driven

One-command installer for [Outline-Driven Development](https://outlinedriven.github.io) across Claude Code, Codex CLI, and Gemini CLI.

## Quick Start

```bash
# Dry-run (inspect what would be written)
npx outline-driven init

# Apply
npx outline-driven init --apply

# Target a specific host
npx outline-driven init --host claude --apply
```

## Options

| Flag | Default | Description |
|---|---|---|
| `--host` | `auto` | Target host: `claude`, `codex`, `gemini`, `opencode` |
| `--scope` | `user` | Install scope: `user` (`~/`) or `project` (`./`) |
| `--apply` | off | Write files (default is dry-run) |

`OUTLINE_DRIVEN_HOST` env var overrides `--host`.

## Methodology

See [Outline-Driven Development](https://github.com/OutlineDriven/outline-driven-development) for the full methodology, philosophy, and comparison with vibe coding and spec-driven approaches.

## License

MIT
