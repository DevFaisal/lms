import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: '6rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 500,
  marginBottom: theme.spacing(4),
}));

interface ErrorPageProps {
  code?: string;
  message?: string;
  showHomeButton?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = '404',
  message = 'Page not found',
  showHomeButton = true,
}) => {
  return (
    <ErrorContainer>
      <ErrorCode variant="h1">
        {code}
      </ErrorCode>
      <ErrorMessage variant="h5">
        {message}
      </ErrorMessage>
      {showHomeButton && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/dashboard"
        >
          Back to Dashboard
        </Button>
      )}
    </ErrorContainer>
  );
};

export default ErrorPage;
