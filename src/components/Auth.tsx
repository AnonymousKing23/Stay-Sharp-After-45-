import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, ArrowRight, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { mapAuthError } from '../lib/authUtils';

interface AuthScreenProps {
  onGoogleLogin: () => Promise<void>;
  onEmailAuth: (email: string, pass: string, isSignUp: boolean) => Promise<void>;
  isLoading: boolean;
}

export const AuthScreen = ({ onGoogleLogin, onEmailAuth, isLoading }: AuthScreenProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await onEmailAuth(email, password, isSignUp);
    } catch (err: any) {
      setError(mapAuthError(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-border/50 shadow-2xl rounded-[2.5rem] overflow-hidden bg-card/50 backdrop-blur-xl">
          <CardHeader className="pt-12 pb-6 text-center px-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-heading font-bold text-primary mb-2">
              {isSignUp ? 'Join the Protocol' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm leading-relaxed">
              {isSignUp 
                ? 'Create your cognitive profile and start your 30-day journey.' 
                : 'Sign in to continue your cognitive longevity journey.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-12">
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 h-12 bg-background/50 border-border/50 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 pr-10 h-12 bg-background/50 border-border/50 rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-destructive/10 text-destructive text-xs p-3 rounded-lg flex items-start gap-2 overflow-hidden"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button 
                type="submit"
                className="w-full h-12 rounded-xl text-lg group bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="relative py-4 mb-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50"></span></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-card px-4 text-muted-foreground/50">Or continue with</span></div>
            </div>

            <Button 
              variant="outline"
              size="lg" 
              className="w-full h-12 text-sm rounded-xl border-border/50 hover:bg-muted/30 flex items-center justify-center gap-3 transition-all mb-6"
              onClick={async () => {
                setError(null);
                try {
                  await onGoogleLogin();
                } catch (err: any) {
                  setError(mapAuthError(err));
                }
              }}
              disabled={isLoading}
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-4 h-4 grayscale-[0.5] group-hover:grayscale-0" 
                referrerPolicy="no-referrer"
              />
              Google Account
            </Button>
            
            <p className="text-center text-sm text-muted-foreground border-t border-border/50 pt-8">
              {isSignUp ? 'Already on the protocol?' : "New to the protocol?"}{' '}
              <button 
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="text-primary font-bold hover:underline ml-1"
              >
                {isSignUp ? 'Sign In' : 'Join the Protocol'}
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
