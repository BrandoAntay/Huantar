import { useEffect, useState } from "react";

export function useVisitorCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/boletas/count");
        if (!res.ok) throw new Error("No se pudo obtener el contador");
        const data = await res.json();
        setCount(data.total);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCount();
    // Opcional: Actualizar cada 10 segundos
    const interval = setInterval(fetchCount, 10000);
    return () => clearInterval(interval);
  }, []);

  return {
    formattedCount: count.toLocaleString(),
    loading,
    error,
  };
}