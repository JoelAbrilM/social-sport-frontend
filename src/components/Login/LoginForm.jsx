// components/LoginForm.jsx
"use client";

import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const decoded = jwtDecode(data.token);
        login(data.token); // Almacena el token y los datos del usuario
        setMessage("Inicio de sesión exitoso.");
        router.push("/home_account"); // Redirige al usuario
      } else {
        console.error("Error:", data.error);
        setMessage("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMessage("Error en la solicitud.");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <span className={styles.kainnos}>kAINNOS</span> XP
        </h1>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.title}>LOGIN</h3>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submit}>
          LogIn
        </button>
        {message && <p>{message}</p>}
        <br />
        <a href="#" className={styles.forgotPassword}>
          Forgot your password?
        </a>
        <a href="/signup" className={styles.register}>
          Don't have an account? SignUp
        </a>
      </form>
    </div>
  );
};
