"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  // --- Styles inline ---
  const styles = {
    body: {
      height: "100vh",
      margin: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f3f4f6",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    form: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "#fff",
      padding: "28px 32px",
      borderRadius: "16px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    },
    title: {
      textAlign: "center",
      marginBottom: "24px",
      fontSize: "26px",
      fontWeight: 600,
      color: "#333",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "18px",
    },
    label: {
      marginBottom: "6px",
      fontSize: "15px",
      fontWeight: 500,
      color: "#444",
    },
    input: {
      padding: "10px 12px",
      fontSize: "15px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      outline: "none",
      transition: "border-color 0.25s, box-shadow 0.25s",
    },
    error: {
      color: "#e11d48",
      fontSize: "13px",
      marginTop: "4px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#2563eb",
      color: "#fff",
      fontSize: "16px",
      fontWeight: 600,
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonDisabled: {
      backgroundColor: "#93c5fd",
      cursor: "not-allowed",
    },
  };

  return (
    <div style={styles.body}>
      <form action={loginAction} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="Enter your email"
            style={styles.input}
          />
          {state?.errors?.email && (
            <p style={styles.error}>{state.errors.email}</p>
          )}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            style={styles.input}
          />
          {state?.errors?.password && (
            <p style={styles.error}>{state.errors.password}</p>
          )}
        </div>

        <SubmitButton styles={styles} />
      </form>
    </div>
  );
}

function SubmitButton({ styles }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{ ...styles.button, ...(pending ? styles.buttonDisabled : {}) }}>
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
