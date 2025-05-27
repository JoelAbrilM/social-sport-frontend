"use client";

import React, { useState } from "react";
import styles from "./Home_Page.module.css";

export const Home_Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>
          <span className={styles.kainnos}>kAINNOS</span> XP
        </h1>
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <a href="#about" className={styles.navbarLinks}>
            About
          </a>
          <a href="#features" className={styles.navbarLinks}>
            Features
          </a>
          <a href="/login" className={styles.loginBtn}>
            Login
          </a>
        </nav>
        <button className={styles.hamburger} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
        {menuOpen && (
          <div className={styles.overlay} onClick={toggleMenu}></div>
        )}
      </header>

      <main className={styles.main}>
        <div className={styles.heroContent}>
          <h2 className={styles.title}>Innovating Human Performance</h2>
          <p className={styles.subtitle}>
            At <strong>KAINNOS XP</strong>, we redefine personal growth with
            smart tracking, global challenges, and a thriving digital community.
            Built for progress, made for you.
          </p>
          <a href="/login" className={styles.cta}>
            Start Your Journey
          </a>
        </div>
      </main>

      <section className={styles.section} id="about">
        <h3>What is KAINNOS XP?</h3>
        <p>
          KAINNOS XP is your next-gen digital companion for performance
          enhancement. Whether you're training for life or competition, our
          platform combines analytics, motivation, and connection to empower
          every step of your journey.
        </p>
      </section>

      <section className={styles.section} id="features">
        <h3>Why Join KAINNOS XP?</h3>
        <ul>
          <li>🌍 Participate in global fitness and mental challenges</li>
          <li>📈 Track personal growth with smart performance analytics</li>
          <li>💬 Connect with a supportive and tech-driven community</li>
          <li>🔐 Enjoy a secure and personalized user experience</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        © 2025 KAINNOS XP. Built with purpose.
      </footer>
    </div>
  );
};
