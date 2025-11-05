// app/login/page.tsx
'use client';

import { useState } from 'react';
import {
  Dialog, DialogContent, Box, IconButton, Typography
} from '@mui/material';
import { X as CloseIcon } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import ChooseMethod from '@/components/auth/ChooseMethod';
import VerifyCode from '@/components/auth/VerifyCode';
import ForgotPassword from '@/components/auth/ForgotPassword';
import VerifyResetCode from '@/components/auth/VerifyResetCode';
import ResetPassword from '@/components/auth/ResetPassword';
import { login, initiateMFA, verifyMFA, forgotPassword, verifyResetCode, resetPassword } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaMethod, setMfaMethod] = useState<'sms' | 'email' | 'app'>('sms');
  const [verificationCode, setVerificationCode] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClose = () => {
    // Redirect back to home on close
    router.push('/');
  };

  const handleLogin = async () => {
    setLoading(true); setError('');
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      router.push('/dashboard');
    } catch (err: any) {
      if (err.message === 'MFA_REQUIRED') {
        await initiateMFA(email);
        setStep(1);
      } else {
        setError(err.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMFA = async () => {
    setLoading(true); setError('');
    try {
      const res = await verifyMFA('mock-mfa-token', verificationCode);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} loading={loading} error={error} setIsForgotFlow={() => setStep(3)} />;
      case 1:
        return <ChooseMethod mfaMethod={mfaMethod} setMfaMethod={setMfaMethod} setActiveStep={() => setStep(2)} />;
      case 2:
        return <VerifyCode verificationCode={verificationCode} setVerificationCode={setVerificationCode} mfaMethod={mfaMethod} handleVerifyMFA={handleVerifyMFA} loading={loading} error={error} setActiveStep={setStep} />;
      case 3:
        return <ForgotPassword resetEmail={resetEmail} setResetEmail={setResetEmail} handleForgotPassword={async () => {
          setLoading(true); setError('');
          try {
            await forgotPassword(resetEmail);
            setStep(4);
          } catch (e: any) { setError(e.message); } finally { setLoading(false); }
        }} loading={loading} error={error} setIsForgotFlow={() => setStep(0)} />;
      case 4:
        return <VerifyResetCode resetCode={resetCode} setResetCode={setResetCode} handleVerifyResetCode={async () => {
          setLoading(true); setError('');
          try {
            await verifyResetCode(resetEmail, resetCode);
            setStep(5);
          } catch (e: any) { setError(e.message); } finally { setLoading(false); }
        }} loading={loading} error={error} setActiveStep={setStep} />;
      case 5:
        return <ResetPassword newPassword={newPassword} setNewPassword={setNewPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} handleResetPassword={async () => {
          if (newPassword !== confirmPassword) return setError('Passwords do not match');
          setLoading(true); setError('');
          try {
            await resetPassword(resetEmail, newPassword);
            setError('Password reset! You can now log in.');
            setStep(0);
          } catch (e: any) { setError(e.message); } finally { setLoading(false); }
        }} loading={loading} error={error} setActiveStep={setStep} />;
      default: return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', justifyContent: 'center', alignItems: 'center' }}>
      {/* Modal always open on this page */}
      <Dialog open={true} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ flex: 1 }}>
              {step === 0 ? 'Welcome Back' : step === 1 ? 'Choose MFA' : step === 2 ? 'Verify Code' : step === 3 ? 'Forgot Password' : step === 4 ? 'Verify Code' : 'Reset Password'}
            </Typography>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          </Box>
          <Box sx={{ p: 3 }}>
            {renderStep()}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}