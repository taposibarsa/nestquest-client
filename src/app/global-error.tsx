"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
          background: "#f7f5f0",
          color: "#1f2937",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#e8a838",
          }}
        >
          NestQuest
        </p>
        <h1
          style={{
            margin: "0.5rem 0 0",
            fontSize: "1.875rem",
            fontWeight: 700,
            color: "#1a2b4a",
          }}
        >
          Something went wrong
        </h1>
        <p style={{ margin: "0.75rem 0 0", maxWidth: "28rem", color: "#6b7280" }}>
          A critical error stopped the page from loading. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1.75rem",
            border: "none",
            borderRadius: "0.5rem",
            background: "#e8a838",
            color: "#1a2b4a",
            fontWeight: 600,
            fontSize: "0.875rem",
            padding: "0.625rem 1.25rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
