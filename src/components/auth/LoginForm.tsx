// src/components/auth/LoginForm.tsx
// FIXED: Added missing useState import for showPassword.

import { useState } from 'react';
import { TextField, Box, Typography, Button, FormControlLabel, InputAdornment, IconButton } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { Divider } from '@mui/material';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleLogin: () => void;
  loading: boolean;
  error: string;
  setIsForgotFlow: (flow: boolean) => void;
}

export default function LoginForm({ email, setEmail, password, setPassword, handleLogin, loading, error, setIsForgotFlow }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Welcome Back
      </Typography>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        error={!!error}
        helperText={error}
      />
      <TextField
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        error={!!error}
        helperText={error}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 2 }}>
        <Button size="small" onClick={() => setIsForgotFlow(true)}>
          Forgot Password?
        </Button>
        <FormControlLabel
          control={<input type="checkbox" defaultChecked />}
          label="Remember me"
        />
      </Box>
      <Button fullWidth variant="contained" onClick={handleLogin} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>
      <Divider sx={{ my: 2 }}>or</Divider>
      <Button fullWidth variant="outlined" disabled sx={{ mb: 2 }}>
        Continue with Microsoft
      </Button>
      <Typography variant="body2" align="center" color="textSecondary">
        Don't have an account? <Button size="small" onClick={() => alert('Sign up feature coming soon!')}>Sign up</Button>
      </Typography>
    </Box>
  );
}