import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      const errorMessage = "An unexpected error occurred. Please try refreshing the page.";
      
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
          <Card className="max-w-md w-full border-destructive/20 shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mx-auto mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl font-heading font-bold text-primary">Something went wrong</CardTitle>
              <CardDescription className="text-muted-foreground">
                {errorMessage}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button onClick={this.handleReset} className="w-full h-12 text-lg">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Application
              </Button>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                If the problem persists, please contact support.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
