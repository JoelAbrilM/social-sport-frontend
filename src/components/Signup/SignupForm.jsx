"use client";
import React, { useState } from "react";
import styles from "./Signup.module.css";

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthday: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [modal, setModal] = useState({
    visible: false,
    message: "",
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(
        name === "password"
          ? value === formData.confirmPassword
          : formData.password === value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      setModal({
        visible: true,
        message: "Las contraseñas no coinciden.",
        success: false,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setModal({
          visible: true,
          message: "Registro exitoso.",
          success: true,
        });
        setFormData({
          fullName: "",
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          gender: "",
          birthday: "",
        });
      } else {
        setModal({
          visible: true,
          message: data.error || "Error al registrar.",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setModal({
        visible: true,
        message: "Error del servidor.",
        success: false,
      });
    }
  };

  const closeModal = () => {
    setModal({ ...modal, visible: false });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <span className={styles.kainnos}>kAINNOS</span> XP
        </h1>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.title}>SIGNUP</h3>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {!passwordMatch && (
              <span className={styles.error}>
                Las contraseñas no coinciden.
              </span>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select your gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
              <option value="custom">Other (please specify)</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              required
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className={styles.submit}>
          Sign Up
        </button>
        <br />
        <br />
        <a href="/login" className={styles.forgotPassword}>
          Already have an account? Log in
        </a>
      </form>

      {modal.visible && (
        <div
          className={`${styles.modal} ${
            modal.success ? styles.success : styles.errorModal
          }`}
        >
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <p>{modal.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};
