import { useState, useCallback } from "react";

export const useGitHubUser = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGitHubUser = useCallback(async (username) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setUserData(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { userData, fetchGitHubUser, error, loading };
};
