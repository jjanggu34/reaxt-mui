import React from 'react';
import { Box, Typography, Alert, AlertColor } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ErrorResponse } from '../../utils/errorHandler';

interface ErrorDisplayProps {
  error: ErrorResponse | null;
  severity?: AlertColor;
  onClose?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  severity = 'error',
  onClose
}) => {
  if (!error) return null;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Alert 
        severity={severity} 
        onClose={onClose}
        icon={<ErrorOutlineIcon />}
        sx={{
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <Typography variant="body1" component="div">
          {error.message}
        </Typography>
        {error.details && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {JSON.stringify(error.details)}
          </Typography>
        )}
      </Alert>
    </Box>
  );
}; 