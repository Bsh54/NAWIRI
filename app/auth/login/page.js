"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field) {
    return (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");
    const result = await login(form);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    router.push("/chat");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.cardHeader}>
          <a href="/" style={styles.logo}>NAWIRI</a>
          <h1 style={styles.heading}>Sign in</h1>
          <p style={styles.sub}>Welcome back. Your data stays on this device.</p>
        </div>

        {/* Form */}
        <form onSubmit={submit} style={styles.form} noValidate>
          <div style={styles.field}>
            <label style={styles.label}>Email address</label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
              style={styles.input}
              onFocus={e => e.target.style.borderColor = "var(--primary)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
              autoComplete="email"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="••••••••"
              style={styles.input}
              onFocus={e => e.target.style.borderColor = "var(--primary)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
              autoComplete="current-password"
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} style={{
            ...styles.btn,
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}><span style={styles.dividerText}>or</span></div>

        {/* Continue without account */}
        <button onClick={() => router.push("/chat")} style={styles.btnGhost}>
          Continue without an account
        </button>

        {/* Register link */}
        <p style={styles.switchLink}>
          No account yet?{" "}
          <a href="/auth/register" style={styles.link}>Create one</a>
        </p>

        {/* Privacy note */}
        <p style={styles.privacyNote}>
          No personal data is transmitted to our servers. Everything stays on your device.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "var(--bg)",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "var(--bg-card)",
    border: "1px solid var(--border-soft)",
    borderRadius: "var(--radius-xl)",
    padding: "40px 36px",
    boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
  },
  cardHeader: { marginBottom: 32, textAlign: "center" },
  logo: {
    display: "inline-block",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700, fontSize: 18,
    color: "var(--text)", letterSpacing: "-0.5px",
    marginBottom: 20, textDecoration: "none",
  },
  heading: {
    fontSize: 26, color: "var(--text)", marginBottom: 6,
  },
  sub: {
    fontSize: 14, color: "var(--text-3)", lineHeight: 1.5,
  },
  form: { display: "flex", flexDirection: "column", gap: 18 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: {
    fontSize: 13, fontWeight: 600,
    color: "var(--text-2)", letterSpacing: "0.01em",
  },
  input: {
    padding: "10px 14px",
    border: "1.5px solid var(--border)",
    borderRadius: "var(--radius)",
    fontSize: 15, color: "var(--text)",
    background: "var(--bg)",
    outline: "none",
    transition: "border-color 0.15s",
  },
  error: {
    padding: "10px 14px",
    background: "#FEF2F2",
    border: "1px solid #FECACA",
    borderRadius: "var(--radius)",
    fontSize: 13, color: "#B91C1C",
  },
  btn: {
    padding: "13px",
    background: "var(--primary)",
    color: "#FFF", border: "none",
    borderRadius: "var(--radius-lg)",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600, fontSize: 15,
    cursor: "pointer",
    transition: "background 0.15s",
    marginTop: 4,
  },
  divider: {
    display: "flex", alignItems: "center", gap: 12,
    margin: "24px 0",
  },
  dividerText: {
    fontSize: 12, color: "var(--text-3)",
    padding: "0 8px",
    background: "var(--bg-card)",
    position: "relative",
    flex: "0 0 auto",
    // trick: use a CSS pseudo trick via inline hack
  },
  btnGhost: {
    width: "100%", padding: "11px",
    background: "var(--bg)", color: "var(--text-2)",
    border: "1.5px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 600, fontSize: 14,
    cursor: "pointer",
    transition: "border-color 0.15s",
  },
  switchLink: {
    textAlign: "center", fontSize: 13,
    color: "var(--text-3)", marginTop: 20,
  },
  link: {
    color: "var(--primary)", fontWeight: 600, textDecoration: "none",
  },
  privacyNote: {
    marginTop: 20,
    fontSize: 11, color: "var(--text-3)",
    textAlign: "center", lineHeight: 1.5,
    padding: "12px 8px",
    background: "var(--bg)",
    borderRadius: "var(--radius)",
    border: "1px solid var(--border-soft)",
  },
};
