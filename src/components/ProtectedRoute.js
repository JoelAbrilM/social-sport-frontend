"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { token, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Solo redirigir si ya terminó de cargar y no hay token
        if (!loading && !token) {
            router.push("/login");
        }
    }, [token, loading, router]);

    if (loading) {
        return <div>Cargando...</div>; // O un spinner
    }

    if (!token) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
