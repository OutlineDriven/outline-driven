export interface Manifest {
  version: string;
  releaseTag: string;
  hosts: Record<string, { userScope: string; projectScope: string; promptFile: string }>;
  tarballContents: { prompts: string[]; gitconfig: string[] };
}

export function parseManifest(raw: unknown): Manifest {
  if (typeof raw !== 'object' || raw === null) throw new Error('Invalid manifest: not an object');
  const m = raw as Record<string, unknown>;
  if (typeof m['version'] !== 'string') throw new Error('Invalid manifest: missing version');
  if (typeof m['releaseTag'] !== 'string') throw new Error('Invalid manifest: missing releaseTag');
  return raw as Manifest;
}
