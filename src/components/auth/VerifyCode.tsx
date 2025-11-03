// src/components/auth/VerifyCode.tsx
// FIXED: Created missing VerifyCode component. Ensure file is saved as VerifyCode.tsx.

import { Box, Typography, Button, TextField } from '@mui/material';
import { CircularProgress } from '@mui/material';

interface VerifyCodeProps {
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  mfaMethod: 'sms' | 'email' | 'app';
  handleVerifyMFA: () => void;
  loading: boolean;
  error: string;
  setActiveStep: (step: number) => void;
}

export default function VerifyCode({ verificationCode, setVerificationCode, mfaMethod, handleVerifyMFA, loading, error, setActiveStep }: VerifyCodeProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Enter Verification Code
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Enter the 6-digit code sent to your {mfaMethod === 'sms' ? 'SMS' : mfaMethod === 'email' ? 'email' : 'authenticator app'}.
      </Typography>
      <TextField
        fullWidth
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
        inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.5em' } }}
        margin="normal"
        error={!!error}
        helperText={error}
      />
      <Button fullWidth variant="contained" onClick={handleVerifyMFA} disabled={loading || verificationCode.length < 6}>
        {loading ? <CircularProgress size={24} /> : 'Verify Code'}
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Button size="small" disabled={loading} onClick={() => setActiveStep(1)}>
          Change Method
        </Button>
        <Button size="small" disabled={loading} onClick={() => {
          setVerificationCode('');
          setTimeout(() => alert('Code resent!'), 500);
        }}>
          Resend Code
        </Button>
      </Box>
      <Button onClick={() => setActiveStep(1)} sx={{ mt: 1, color: 'primary.main' }}>
        Back
      </Button>
    </Box>
  );
}