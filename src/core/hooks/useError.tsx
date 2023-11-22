import { useState } from "react";

export const useError = () => {
  const [error, setError] = useState<{ isError: boolean; message: string }>({
    isError: false,
    message: "",
  });

  const resetError = () => {
    setTimeout(() => {
      setError({
        isError: false,
        message: "",
      });
    }, 3000);
  };

  return { error, setError, resetError };
};
