// Lightweight client-side auth — no backend, data stays on device.
// Privacy argument: zero personal data transmitted to our servers.

const USER_KEY = "nawiri_user";

export function getUser() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(USER_KEY) || "null"); }
  catch { return null; }
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify({ ...user, createdAt: user.createdAt || Date.now() }));
}

export function logout() {
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn() {
  return getUser() !== null;
}

// Minimal "password" — hashed in-browser so it's never stored plain.
export async function hashPassword(pwd) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pwd));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function register({ name, email, password }) {
  const existing = getUser();
  if (existing && existing.email === email) return { error: "An account already exists on this device." };
  const hash = await hashPassword(password);
  const user = { name, email, passwordHash: hash };
  saveUser(user);
  return { user };
}

export async function login({ email, password }) {
  const user = getUser();
  if (!user || user.email !== email) return { error: "No account found with this email." };
  const hash = await hashPassword(password);
  if (hash !== user.passwordHash) return { error: "Incorrect password." };
  return { user };
}
