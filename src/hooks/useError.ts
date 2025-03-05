import { useState, useCallback } from 'react';
import { ErrorResponse, ErrorHandler } from '../utils/errorHandler';

export const useError = () => {
  const [error, setError] = useState<ErrorResponse | null>(null);

  const handleError = useCallback((error: unknown, context?: string) => {
    const errorResponse = ErrorHandler.handle(error);
    ErrorHandler.log(error, context);
    setError(errorResponse);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError
  };
}; 