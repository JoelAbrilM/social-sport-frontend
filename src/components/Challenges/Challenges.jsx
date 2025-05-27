// src/app/components/Challenges.jsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./Challenges.module.css";
import { useAuth } from "@/context/AuthContext";

export const Challenges = () => {
  const { token, user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [assignedChallenges, setAssignedChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/challenges", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setChallenges(data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    const fetchAssignedChallenges = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/user_challenges/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setAssignedChallenges(data.map((uc) => uc.challenge_id));
      } catch (error) {
        console.error("Error fetching assigned challenges:", error);
      }
    };

    if (token && user) {
      fetchChallenges();
      fetchAssignedChallenges();
      setLoading(false);
    }
  }, [token, user]);

  const handleAssign = async (challengeId) => {
    try {
      const res = await fetch("http://localhost:4000/api/user_challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: user.id,
          challenge_id: challengeId,
        }),
      });

      if (res.ok) {
        setAssignedChallenges([...assignedChallenges, challengeId]);
      } else {
        console.error("Error assigning challenge");
      }
    } catch (error) {
      console.error("Error assigning challenge:", error);
    }
  };

  const filteredChallenges = challenges.filter((challenge) =>
    challenge.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className={styles.loading}>Cargando desafíos...</div>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.kainnos}>kAINNOS</span>
          <span className={styles.xp}> XP</span>
        </div>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Challenges</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar por categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <br />
        <div className={styles.container}>
          {filteredChallenges.map((challenge) => (
            <div key={challenge.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{challenge.name}</h3>
              <p className={styles.description}>{challenge.description}</p>
              <p className={styles.level}>Nivel: {challenge.level}</p>
              <p className={styles.category}>Categoría: {challenge.category}</p>
              <button
                className={styles.button}
                onClick={() => handleAssign(challenge.id)}
                disabled={assignedChallenges.includes(challenge.id)}
              >
                {assignedChallenges.includes(challenge.id)
                  ? "Asignado"
                  : "Asignarme"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
