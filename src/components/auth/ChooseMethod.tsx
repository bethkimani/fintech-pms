import { Box, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { MessageCircle, Mail, Smartphone } from 'lucide-react';

interface ChooseMethodProps {
  mfaMethod: 'sms' | 'email' | 'app';
  setMfaMethod: (method: 'sms' | 'email' | 'app') => void;
  setActiveStep: (step: number) => void;
}

export default function ChooseMethod({ mfaMethod, setMfaMethod, setActiveStep }: ChooseMethodProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Choose Authentication Method
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        How would you like to receive your verification code?
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={mfaMethod} onChange={(e) => setMfaMethod(e.target.value as any)}>
          <FormControlLabel 
            value="sms" 
            control={<Radio />} 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MessageCircle size={20} />
                <Typography ml={1}>SMS text message</Typography>
              </Box>
            } 
          />
          <FormControlLabel 
            value="email" 
            control={<Radio />} 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Mail size={20} />
                <Typography ml={1}>Email</Typography>
              </Box>
            } 
          />
          <FormControlLabel 
            value="app" 
            control={<Radio />} 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Smartphone size={20} />
                <Typography ml={1}>Authenticator App</Typography>
              </Box>
            } 
          />
        </RadioGroup>
      </FormControl>
      <Button fullWidth variant="contained" onClick={() => setActiveStep(2)} sx={{ mt: 2 }}>
        Continue
      </Button>
      <Button onClick={() => setActiveStep(0)} sx={{ mt: 1, color: 'primary.main' }}>
        Back to Login
      </Button>
    </Box>
  );
}