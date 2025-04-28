"use client";
import { useState } from "react";
import { signIn }    from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      phone,
      password,
    });
    setLoading(false);

    if (res?.error) {
      alert("Invalid phone or password");
    } else {
      router.push("/");
    }
  }

  return (
    <form
      onSubmit={onLogin}
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h2>Login</h2>
      <input
        type="text"
        placeholder="+15551234567"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Signing in…" : "Sign In"}
      </button>
      <p style={{ fontSize: 14 }}>
        Don’t have an account? <a href="/register">Register</a>
      </p>
    </form>
  );
}
