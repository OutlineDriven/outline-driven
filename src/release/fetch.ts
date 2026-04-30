// TODO(W5): implement release artifact fetch
// Flow: fetch SHA256SUMS+sig+pem → verify via verifyRelease → fetch tarball → verifyTarball → extract
// INVARIANT: no bytes of tarball content are used before both verifications pass

export async function fetchAndVerifyRelease(_version: string, _cacheDir: string): Promise<string> {
  throw new Error('fetchAndVerifyRelease not yet implemented — awaiting W5 release publication');
}
