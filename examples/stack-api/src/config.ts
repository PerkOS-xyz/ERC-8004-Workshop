export const STACK_BASE_URL = "https://stack.perkos.xyz";
export const DEFAULT_NETWORK = "base";
export const DEFAULT_ADDRESS = "0x3f0D7b9916212fA0A9Ac0EF8f72a25EB56F7046C";

export function stackUrl(path: string): string {
  return `${STACK_BASE_URL}${path}`;
}

export async function stackGet(path: string): Promise<Response> {
  const url = stackUrl(path);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`GET ${url} returned ${res.status}: ${res.statusText}`);
  }
  return res;
}

export async function stackPost(path: string, body: Record<string, unknown>): Promise<Response> {
  const url = stackUrl(path);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res;
}
