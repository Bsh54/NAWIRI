"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../../lib/auth";

const STEPS = ["Account", "Location & Language", "Done"];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep]   = useState(0);
  const [form, setForm]   = useState({
    name: "", email: "", password: "", confirm: "",
    country: "Benin", language: "English",
  });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  function set(field) {
    return (e) => { setForm(f => ({ ...f, [field]: e.target.value })); setError(""); }
  }
  function pick(field, val) {
    setForm(f => ({ ...f, [field]: val }));
  }

  async function nextStep(e) {
    e.preventDefault();
    setError("");

    if (step === 0) {
      if (!form.name.trim()) return setError("Please enter your name.");
      if (!form.email.includes("@")) return setError("Please enter a valid email address.");
      if (form.password.length < 6) return setError("Password must be at least 6 characters.");
      if (form.password !== form.confirm) return setError("Passwords do not match.");
      setStep(1);
      return;
    }

    if (step === 1) {
      setLoading(true);
      const result = await register({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        country: form.country,
        language: form.language,
      });
      setLoading(false);
      if (result.error) { setError(result.error); return; }
      setStep(2);
    }
  }

  const inputStyle = {
    padding: "10px 14px",
    border: "1.5px solid var(--border)",
    borderRadius: "var(--radius)",
    fontSize: 15, color: "var(--text)",
    background: "var(--bg)", outline: "none",
    transition: "border-color 0.15s",
    width: "100%", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "var(--bg)" }}>
      <div style={{
        width: "100%", maxWidth: 460,
        background: "var(--bg-card)",
        border: "1px solid var(--border-soft)",
        borderRadius: "var(--radius-xl)",
        padding: "40px 36px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
      }}>

        {/* Logo + progress */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <a href="/" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "var(--text)", letterSpacing: "-0.5px", display: "inline-block", marginBottom: 20 }}>
            NAWIRI
          </a>

          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 24 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12,
                  background: i <= step ? "var(--primary)" : "var(--bg-muted)",
                  color: i <= step ? "#FFF" : "var(--text-3)",
                  transition: "all 0.2s",
                }}>
                  {i < step ? "✓" : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    width: 40, height: 2,
                    background: i < step ? "var(--primary)" : "var(--border)",
                    transition: "background 0.2s",
                  }} />
                )}
              </div>
            ))}
          </div>

          <h1 style={{ fontSize: 24, color: "var(--text)", marginBottom: 6 }}>
            {step === 0 && "Create your account"}
            {step === 1 && "Your location & language"}
            {step === 2 && "You're all set"}
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-3)" }}>
            {step === 0 && "Your data stays on this device."}
            {step === 1 && "This helps NAWIRI find the right programs for you."}
            {step === 2 && "Your account has been created on this device."}
          </p>
        </div>

        {/* ── STEP 0 : Account ── */}
        {step === 0 && (
          <form onSubmit={nextStep} style={{ display: "flex", flexDirection: "column", gap: 16 }} noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>Full name</label>
              <input type="text" value={form.name} onChange={set("name")} placeholder="Aminata Diallo" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--primary)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
                autoComplete="name"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>Email address</label>
              <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--primary)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
                autoComplete="email"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>Password</label>
              <input type="password" value={form.password} onChange={set("password")} placeholder="At least 6 characters" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--primary)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
                autoComplete="new-password"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>Confirm password</label>
              <input type="password" value={form.confirm} onChange={set("confirm")} placeholder="••••••••" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--primary)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
                autoComplete="new-password"
              />
            </div>

            {error && <div style={{ padding: "10px 14px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "var(--radius)", fontSize: 13, color: "#B91C1C" }}>{error}</div>}

            <button type="submit" style={{
              marginTop: 4, padding: "13px",
              background: "var(--primary)", color: "#FFF", border: "none",
              borderRadius: "var(--radius-lg)",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15,
              cursor: "pointer",
            }}>
              Continue →
            </button>

            <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-3)", marginTop: 4 }}>
              Already have an account?{" "}
              <a href="/auth/login" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>Sign in</a>
            </p>
          </form>
        )}

        {/* ── STEP 1 : Location & Language ── */}
        {step === 1 && (
          <form onSubmit={nextStep} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-2)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
                Country
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                {["Benin", "Senegal", "Ghana"].map(c => (
                  <button key={c} type="button" onClick={() => pick("country", c)} style={{
                    flex: 1, padding: "10px 4px",
                    border: form.country === c ? "1.5px solid var(--primary)" : "1.5px solid var(--border)",
                    borderRadius: "var(--radius)",
                    background: form.country === c ? "var(--primary-soft)" : "var(--bg)",
                    color: form.country === c ? "var(--primary-dark)" : "var(--text-2)",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.12s",
                  }}>{c}</button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-2)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
                Preferred language
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                {[["English","English"],["French","Français"]].map(([val, lbl]) => (
                  <button key={val} type="button" onClick={() => pick("language", val)} style={{
                    flex: 1, padding: "10px 4px",
                    border: form.language === val ? "1.5px solid var(--green)" : "1.5px solid var(--border)",
                    borderRadius: "var(--radius)",
                    background: form.language === val ? "var(--green-soft)" : "var(--bg)",
                    color: form.language === val ? "var(--green)" : "var(--text-2)",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.12s",
                  }}>{lbl}</button>
                ))}
              </div>
            </div>

            {error && <div style={{ padding: "10px 14px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "var(--radius)", fontSize: 13, color: "#B91C1C" }}>{error}</div>}

            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <button type="button" onClick={() => setStep(0)} style={{
                flex: 1, padding: "12px",
                background: "var(--bg)", color: "var(--text-2)",
                border: "1.5px solid var(--border)", borderRadius: "var(--radius-lg)",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer",
              }}>
                Back
              </button>
              <button type="submit" disabled={loading} style={{
                flex: 2, padding: "12px",
                background: "var(--primary)", color: "#FFF", border: "none",
                borderRadius: "var(--radius-lg)",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15,
                cursor: "pointer", opacity: loading ? 0.7 : 1,
              }}>
                {loading ? "Creating account…" : "Create account"}
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 2 : Done ── */}
        {step === 2 && (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "var(--green-soft)", border: "2px solid var(--green)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: 22, color: "var(--green)",
            }}>
              ✓
            </div>

            <div style={{
              background: "var(--bg)", border: "1px solid var(--border-soft)",
              borderRadius: "var(--radius-lg)", padding: "16px 20px",
              textAlign: "left", marginBottom: 28,
            }}>
              {[
                ["Name", form.name],
                ["Email", form.email],
                ["Country", form.country],
                ["Language", form.language],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border-soft)" }}>
                  <span style={{ fontSize: 13, color: "var(--text-3)" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{val}</span>
                </div>
              ))}
            </div>

            <button onClick={() => router.push(`/chat?country=${form.country}&language=${form.language}`)} style={{
              width: "100%", padding: "14px",
              background: "var(--primary)", color: "#FFF", border: "none",
              borderRadius: "var(--radius-lg)",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15,
              cursor: "pointer",
            }}>
              Start using NAWIRI →
            </button>

            <p style={{ marginTop: 12, fontSize: 11, color: "var(--text-3)" }}>
              Your account exists only on this device. No data was sent to our servers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
