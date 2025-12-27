export type SandboxMode = "safe" | "compat" | "loose";

export type PlayerPolicy = {
  mode: SandboxMode;
  allow: string;
  sandbox?: string;
};

const ALLOW = "autoplay; fullscreen; picture-in-picture";

const SANDBOX_SAFE = "allow-scripts allow-same-origin allow-presentation";
const SANDBOX_COMPAT =
  "allow-scripts allow-same-origin allow-presentation allow-forms allow-popups allow-top-navigation-by-user-activation";

export const POLICY_PRESETS: Record<SandboxMode, PlayerPolicy> = {
  safe: { mode: "safe", allow: ALLOW, sandbox: SANDBOX_SAFE },
  compat: { mode: "compat", allow: ALLOW, sandbox: SANDBOX_COMPAT },
  loose: { mode: "loose", allow: ALLOW },
};

const LS_PREFIX = "4yasenime:player-mode:";

function getHost(url: string) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

export function preferenceKey(server: string, url: string) {
  const host = getHost(url);
  const scope = host || server.trim().toLowerCase() || "default";
  return `${LS_PREFIX}${scope}`;
}

export function readModePreference(
  server: string,
  url: string
): SandboxMode | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(preferenceKey(server, url));
  if (raw === "safe" || raw === "compat" || raw === "loose") return raw;
  return null;
}

export function writeModePreference(
  server: string,
  url: string,
  mode: SandboxMode
) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(preferenceKey(server, url), mode);
}

export function pickDefaultMode(_server: string, _url: string): SandboxMode {
  return "safe";
}

export function resolvePolicy(
  _server: string,
  _url: string,
  mode: SandboxMode
): PlayerPolicy {
  return POLICY_PRESETS[mode];
}

export function nextMode(mode: SandboxMode): SandboxMode {
  return mode === "safe" ? "compat" : mode === "compat" ? "loose" : "safe";
}

export function modeLabel(mode: SandboxMode) {
  return mode === "safe" ? "Safe" : mode === "compat" ? "Compat" : "Loose";
}
