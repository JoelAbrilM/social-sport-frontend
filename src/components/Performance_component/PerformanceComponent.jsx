// src/components/PerformanceComponent.jsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "./Performance.module.css";
import { useAuth } from "@/context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL;

export const PerformanceComponent = () => {
  const { user, token, loading } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [checklist, setChecklist] = useState([]);

  useEffect(() => {
    if (loading || !user || !token) return;

    fetch(`${API}/api/user_challenges/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((rows) => {
        const ids = rows.map((r) => r.challenge_id);
        return fetch(`${API}/api/challenges/bulk`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ids }),
        });
      })
      .then((res) => res.json())
      .then(setChallenges)
      .catch(console.error);
  }, [user, loading, token]);

  const openModal = (ch) => {
    setSelected(ch);
    const parsed = typeof ch.body === "string" ? JSON.parse(ch.body) : ch.body;

    const steps = parsed.steps || [];
    setChecklist(steps.map((step, i) => ({ ...step, done: false, index: i })));

    fetch(`${API}/api/user_challenges/progress/${user.id}/${ch.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((obj) => {
        const doneIdx = Array.isArray(obj.progress) ? obj.progress : [];
        setChecklist((prev) =>
          prev.map((item) => ({
            ...item,
            done: doneIdx.includes(item.index),
          }))
        );
      })
      .catch(console.error);

    setModalOpen(true);
  };

  const toggleItem = (idx) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.index === idx ? { ...item, done: !item.done } : item
      )
    );
  };

  const saveProgress = () => {
    const doneIndexes = checklist.filter((i) => i.done).map((i) => i.index);
    fetch(`${API}/api/user_challenges/${selected.id}/progress`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ progress: doneIndexes }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        alert("Progreso guardado");
      })
      .catch(console.error);
  };

  const completeChallenge = () => {
    fetch(`${API}/api/user_challenges/${selected.id}/complete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        alert("¡Reto finalizado!");
        setModalOpen(false);
      })
      .catch(console.error);
  };

  return (
    <>
      <div className={styles.headerKainnos}>
        <div className={styles.headerTitle}>
          <span className={styles.kainnos}>kAINNOS</span>
          <span className={styles.xp}> XP</span>
        </div>
      </div>
      <br />
      <br />
      <h1 className={styles.title}>Mis Retos</h1>
      <div className={styles.centerContainer}>
        <div className={styles.grid}>
          {challenges.map((ch) => (
            <div key={ch.id} className={styles.card}>
              <h3>{ch.name}</h3>
              <p>{ch.description}</p>
              <div className={styles.meta}>
                <span>{ch.level}</span>
                <span>{ch.category}</span>
              </div>
              <button className={styles.btn} onClick={() => openModal(ch)}>
                Abrir reto
              </button>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && selected && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <header className={styles.header}>
              <h2>{selected.name}</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </header>
            <p>{selected.description}</p>
            <div className={styles.checklist}>
              {checklist.map((item) => (
                <label key={item.index} className={styles.checkItem}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    disabled={item.index > 0 && !checklist[item.index - 1].done}
                    onChange={() => toggleItem(item.index)}
                  />
                  <strong>{item.title}</strong>: {item.description}
                </label>
              ))}
            </div>
            <footer className={styles.footer}>
              <button className={styles.btn} onClick={saveProgress}>
                Guardar progreso
              </button>
              <button
                className={styles.btn}
                disabled={!checklist.every((i) => i.done)}
                onClick={completeChallenge}
              >
                Reto finalizado
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};
