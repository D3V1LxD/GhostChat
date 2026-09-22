"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { decodeInviteLink } from "@/lib/link-encoder";
import { AnimatedTagline } from "@/components/AnimatedTagline";
import { CyclingFeatures } from "@/components/CyclingFeatures";

export default function Home() {
  const router = useRouter();
  const [encodedInput, setEncodedInput] = useState("");
  const [decodeError, setDecodeError] = useState("");

  const handleDecode = () => {
    const decoded = decodeInviteLink(encodedInput);
    if (decoded) {
      window.location.href = decoded;
    } else {
      setDecodeError("Invalid code format");
      setTimeout(() => setDecodeError(""), 3000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "90%" }}>
        <div
          style={{
            width: "100%",
            maxWidth: 500,
            margin: "0 auto 32px",
            padding: 16,
            background: "rgba(255, 255, 255, 0.05)",
            border: "2px solid rgba(255, 221, 0, 0.3)",
            borderRadius: 12,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 8,
              color: "#fff",
            }}
          >
            Paste the code sent by your peer here to open chat
          </div>
          <input
            type="text"
            value={encodedInput}
            onChange={(e) => setEncodedInput(e.target.value)}
            placeholder="Paste encoded invite code..."
            style={{
              width: "100%",
              padding: 12,
              background: "#0a0a0a",
              border: decodeError ? "1px solid #f00" : "1px solid #333",
              borderRadius: 8,
              color: "#fd0",
              fontSize: 11,
              fontFamily: "monospace",
              outline: "none",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          />
          <button
            onClick={handleDecode}
            disabled={!encodedInput.trim()}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 8,
              background: encodedInput.trim()
                ? "linear-gradient(135deg, #0f0 0%, #0d0 100%)"
                : "#333",
              border: "none",
              borderRadius: 8,
              color: encodedInput.trim() ? "#000" : "#666",
              fontSize: 12,
              fontWeight: 600,
              cursor: encodedInput.trim() ? "pointer" : "not-allowed",
            }}
          >
            Decode & Connect
          </button>
          {decodeError && (
            <div style={{ marginTop: 8, fontSize: 10, color: "#f00" }}>
              {decodeError}
            </div>
          )}
        </div>
        <img
          src="/assets/ghostNobg.png"
          alt="Ghost"
          style={{ width: "100px", height: "100px", marginBottom: 16 }}
          className="ghost-icon"
        />
        <h1
          style={{
            fontSize: "clamp(32px, 8vw, 48px)",
            marginBottom: 12,
            fontWeight: 700,
          }}
        >
          GhostChat
        </h1>
        <AnimatedTagline text="Your messages vanish like ghosts" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <button onClick={() => router.push("/chat")} className="start-btn">
            Generate Chat
          </button>
        </div>
        <CyclingFeatures />
      </div>
    </div>
  );
}
