// src/components/auth/ResetPassword.tsx
// Separated: Reset password step.

import { TextField, Box, Typography, Button } from '@mui/material';
import { CircularProgress } from '@mui/material';

interface ResetPasswordProps {
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  handleResetPassword: () => void;
  loading: boolean;
  error: string;
  setActiveStep: (step: number) => void;
}

export default function ResetPassword({ newPassword, setNewPassword, confirmPassword, setConfirmPassword, handleResetPassword, loading, error, setActiveStep }: ResetPasswordProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Reset Password
      </Typography>
      <TextField
        fullWidth
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        margin="normal"
        error={!!error}
        helperText={error || "Must contain uppercase, lowercase, number, special char"}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
      />
      <Button fullWidth variant="contained" onClick={handleResetPassword} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Reset Password'}
      </Button>
      <Button onClick={() => setActiveStep(1)} sx={{ mt: 1, color: 'primary.main' }}>
        Back
      </Button>
    </Box>
  );
}