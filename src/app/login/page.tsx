// src/app/login/page.tsx
// Fixed: Added missing useState import. Ensured all component imports match file names.

'use client';

import { useState } from 'react';
import { Box, Typography, Divider, Alert, Stepper, Step, StepLabel, Button, CircularProgress } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import ChooseMethod from '@/components/auth/ChooseMethod';
import VerifyCode from '@/components/auth/VerifyCode';
import ForgotPassword from '@/components/auth/ForgotPassword';
import VerifyResetCode from '@/components/auth/VerifyResetCode'; // FIXED: Renamed import to match file
import ResetPassword from '@/components/auth/ResetPassword';
import { login, initiateMFA, verifyMFA, forgotPassword, verifyResetCode, resetPassword } from '@/lib/api';

const steps = ['Sign In', 'Choose Method', 'Verify Code'];

export default function LoginPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaMethod, setMfaMethod] = useState<'sms' | 'email' | 'app'>('sms');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotFlow, setIsForgotFlow] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.message === 'MFA_REQUIRED') {
        setActiveStep(1);
        try {
          await initiateMFA(email);
        } catch (initErr) {
          console.error('MFA init error:', initErr);
        }
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMFA = async () => {
    if (!verificationCode || verificationCode.length < 6) {
      setError('Please enter a valid 6-digit verification code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await verifyMFA('mock-mfa-token', verificationCode);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      console.error('MFA verify error:', err);
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setError('Please enter email');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await forgotPassword(resetEmail);
      setActiveStep(1);
      setIsForgotFlow(true);
    } catch (err: any) {
      console.error('Forgot password error:', err);
      setError(err.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyResetCode = async () => {
    if (!resetCode || resetCode.length < 6) {
      setError('Please enter a valid 6-digit reset code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await verifyResetCode(resetEmail, resetCode);
      setActiveStep(2);
    } catch (err: any) {
      console.error('Reset code verify error:', err);
      setError(err.message || 'Invalid reset code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await resetPassword(resetEmail, newPassword);
      setActiveStep(0);
      setIsForgotFlow(false);
      setResetEmail('');
      setError('');
      alert('Password reset successfully. Please log in with your new password.');
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = () => {
    if (isForgotFlow) {
      switch (activeStep) {
        case 0:
          return <ForgotPassword resetEmail={resetEmail} setResetEmail={setResetEmail} handleForgotPassword={handleForgotPassword} loading={loading} error={error} setIsForgotFlow={setIsForgotFlow} />;
        case 1:
          return <VerifyResetCode resetCode={resetCode} setResetCode={setResetCode} handleVerifyResetCode={handleVerifyResetCode} loading={loading} error={error} setActiveStep={setActiveStep} />;
        case 2:
          return <ResetPassword newPassword={newPassword} setNewPassword={setNewPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} handleResetPassword={handleResetPassword} loading={loading} error={error} setActiveStep={setActiveStep} />;
        default:
          return null;
      }
    }

    switch (activeStep) {
      case 0:
        return <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} loading={loading} error={error} setIsForgotFlow={setIsForgotFlow} />;
      case 1:
        return <ChooseMethod mfaMethod={mfaMethod} setMfaMethod={setMfaMethod} setActiveStep={setActiveStep} />;
      case 2:
        return <VerifyCode verificationCode={verificationCode} setVerificationCode={setVerificationCode} mfaMethod={mfaMethod} handleVerifyMFA={handleVerifyMFA} loading={loading} error={error} setActiveStep={setActiveStep} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, backgroundColor: 'grey.50' }}>
      <Box sx={{ maxWidth: 400, width: '100%' }}>
        <Button startIcon={<ArrowLeft />} onClick={() => router.push('/')} sx={{ mb: 3 }}>
          Back to Home
        </Button>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h4" align="center" gutterBottom>
            SecureAuth
          </Typography>
          {!isForgotFlow && (
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
          {getStepContent()}
        </Box>
      </Box>
    </Box>
  );
}