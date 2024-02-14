import { useState, useEffect, useCallback } from "react";

export const useFetchTask = () => {
  const url = "http://localhost:8080/tasks";

  const [data, setData] = useState<{}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependency array includes fetchMyData because it's memoized with useCallback

  return { data, loading, error, fetchData: fetchData };
};
