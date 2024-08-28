import { useState, useEffect } from "react";
/**
 * Query hook.
 *
 * @param fn Fetch function
 * @returns {isLoading, error, data}
 */
export const useQuery = (fn: (args?: any) => Promise<Response>, options?: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fn(options);
        const data = await response.json();
        setData(data);
      } catch (error: any) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isLoading,
    data,
    error,
  };
};
