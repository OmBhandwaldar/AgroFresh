"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [step, setStep] = useState<"phone"|"otp">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode]  = useState("");

  async function onSend() {
    await fetch("/api/auth/send-otp", {
      method: "POST",
      body:   JSON.stringify({ phone }),
      headers:{ "Content-Type":"application/json" },
    });
    setStep("otp");
  }

  async function onVerify() {
    const res = await signIn("credentials", {
      redirect: false,
      phone,
      code,
    });
    if (!res?.error) {
      window.location.href = "/";
    } else {
      alert("Invalid or expired code");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      {step === "phone" ? (
        <>
          <h2>Enter your phone</h2>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+15551234567"
          />
          <button onClick={onSend}>Send OTP</button>
        </>
      ) : (
        <>
          <h2>Enter the OTP</h2>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
          />
          <button onClick={onVerify}>Verify & Login</button>
        </>
      )}
    </div>
  );
}
