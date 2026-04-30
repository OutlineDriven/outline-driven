// TODO(W5): implement cosign verification via @sigstore/verify
// PRE: SHA256SUMS, SHA256SUMS.sig, SHA256SUMS.pem fetched from release assets
// POST: verified tarball sha256 matches SHA256SUMS entry; throws on any mismatch
// INVARIANT: verification MUST succeed before any tarball extraction

export async function verifyRelease(_sha256sumsPath: string, _sigPath: string, _pemPath: string): Promise<void> {
  throw new Error('verifyRelease not yet implemented — awaiting W5 cosign integration');
}

export async function verifyTarball(_tarballPath: string, _sha256sumsPath: string): Promise<void> {
  throw new Error('verifyTarball not yet implemented — awaiting W5 cosign integration');
}
