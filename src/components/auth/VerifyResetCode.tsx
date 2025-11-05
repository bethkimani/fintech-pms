import { TextField, Box, Typography, Button } from '@mui/material';
import { CircularProgress } from '@mui/material';

interface VerifyResetCodeProps {
  resetCode: string;
  setResetCode: (code: string) => void;
  handleVerifyResetCode: () => void;
  loading: boolean;
  error: string;
  setActiveStep: (step: number) => void;
}

export default function VerifyResetCode({ resetCode, setResetCode, handleVerifyResetCode, loading, error, setActiveStep }: VerifyResetCodeProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Verify Reset Code
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Enter the 6-digit code sent to your email.
      </Typography>
      <TextField
        fullWidth
        label="6-Digit Code"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
        inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.5em' } }}
        margin="normal"
        error={!!error}
        helperText={error}
      />
      <Button fullWidth variant="contained" onClick={handleVerifyResetCode} disabled={loading || resetCode.length < 6}>
        {loading ? <CircularProgress size={24} /> : 'Verify Code'}
      </Button>
      <Button onClick={() => setActiveStep(0)} sx={{ mt: 1, color: 'primary.main' }}>
        Back
      </Button>
    </Box>
  );
}