import { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, RefreshCw, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Attempting auth...', { isLogin, email });
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await sendEmailVerification(userCredential.user);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for Firebase Auth. Please check your Firebase Console settings.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled in your Firebase Console. Please enable it under Authentication > Sign-in method.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network request failed. Please check your internet connection and ensure your Firebase configuration is correct.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Incorrect email or password. Since you recently updated your Firebase configuration, you may need to create a new account.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err: any) {
      console.error('Reset error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled in your Firebase Console.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network request failed. Please check your connection.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (forgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-heading font-bold text-primary">Reset Password</CardTitle>
              <CardDescription className="text-muted-foreground font-medium">
                {resetSent ? "Check your email for instructions" : "Enter your email to receive a reset link"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resetSent ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => { setForgotPassword(false); setResetSent(false); }}>
                    Back to Login
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="reset-email" 
                        type="email" 
                        placeholder="name@example.com" 
                        className="pl-10 h-12"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {error && <p className="text-xs text-destructive text-center">{error}</p>}
                  <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : "Send Reset Link"}
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setForgotPassword(false)}>
                    Back to Login
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">Stay Sharp After 45</h1>
          <p className="text-muted-foreground">Your premium brain health companion</p>
        </div>

        <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground font-medium">
              {isLogin ? "Sign in to continue your journey" : "Join the 30-day brain health protocol"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="pl-10 h-12"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <button 
                      type="button" 
                      onClick={() => setForgotPassword(true)}
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 pr-10 h-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {error && <p className="text-xs text-destructive text-center">{error}</p>}
              <Button type="submit" className="w-full h-12 text-lg group" disabled={loading}>
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex items-center gap-2 w-full">
              <div className="h-px bg-border flex-1" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">or</span>
              <div className="h-px bg-border flex-1" />
            </div>
            <Button 
              variant="ghost" 
              className="w-full h-12" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export const VerificationPendingScreen = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      await sendEmailVerification(user);
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8">
          <Mail className="w-12 h-12" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-heading font-bold text-primary">Verify Your Email</h1>
          <p className="text-muted-foreground font-medium leading-relaxed">
            We've sent a verification link to <span className="font-bold text-foreground">{user.email}</span>. 
            Please check your inbox and click the link to activate your account.
          </p>
        </div>

        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl p-6 space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Didn't receive the email?</p>
            <Button 
              variant="outline" 
              className="w-full h-12" 
              onClick={handleResend}
              disabled={loading || sent}
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : sent ? "Email Sent!" : "Resend Verification Email"}
            </Button>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button variant="ghost" className="w-full" onClick={() => signOut(auth)}>
              Sign Out
            </Button>
            <Button variant="link" className="text-xs text-muted-foreground" onClick={() => window.location.reload()}>
              I've verified my email
            </Button>
          </div>
        </Card>

        <p className="text-xs text-muted-foreground">
          Need help? Contact <a href="mailto:support@staysharp45.com" className="text-primary hover:underline">support@staysharp45.com</a>
        </p>
      </motion.div>
    </div>
  );
};
