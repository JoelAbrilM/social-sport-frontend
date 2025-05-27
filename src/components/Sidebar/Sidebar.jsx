"use client";

import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import {
  FaHome,
  FaUsers,
  FaTrophy,
  FaChartLine,
  FaUser,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={styles.hamburger} onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <nav className={styles.nav}>
          <a
            href="/home_account"
            className={styles.link}
            onClick={toggleSidebar}
          >
            <FaHome /> <span>Home</span>
          </a>
          <a href="/community" className={styles.link} onClick={toggleSidebar}>
            <FaUsers /> <span>Community</span>
          </a>
          <a href="/challenges" className={styles.link} onClick={toggleSidebar}>
            <FaTrophy /> <span>Challenges</span>
          </a>
          <a
            href="/performance"
            className={styles.link}
            onClick={toggleSidebar}
          >
            <FaChartLine /> <span>Performance</span>
          </a>
          <a href="/user" className={styles.link} onClick={toggleSidebar}>
            <FaUser /> <span>User</span>
          </a>
          <a
            href="#logout"
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <FaSignOutAlt /> <span>Logout</span>
          </a>
        </nav>
      </div>
    </>
  );
};
