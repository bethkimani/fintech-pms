// src/components/auth/ForgotPassword.tsx
// Separated: Forgot password step.

import { TextField, Box, Typography, Button } from '@mui/material';
import { CircularProgress } from '@mui/material';

interface ForgotPasswordProps {
  resetEmail: string;
  setResetEmail: (email: string) => void;
  handleForgotPassword: () => void;
  loading: boolean;
  error: string;
  setIsForgotFlow: (flow: boolean) => void;
}

export default function ForgotPassword({ resetEmail, setResetEmail, handleForgotPassword, loading, error, setIsForgotFlow }: ForgotPasswordProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Forgot Password
      </Typography>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={resetEmail}
        onChange={(e) => setResetEmail(e.target.value)}
        margin="normal"
        error={!!error}
        helperText={error}
      />
      <Button fullWidth variant="contained" onClick={handleForgotPassword} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
      </Button>
      <Button onClick={() => setIsForgotFlow(false)} sx={{ mt: 2, color: 'primary.main' }}>
        Back to Login
      </Button>
    </Box>
  );
}