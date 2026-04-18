/**
 * Maps Firebase Auth error codes to user-friendly messages.
 */
export const mapAuthError = (error: any): string => {
  const code = error?.code || '';
  
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'The email or password you entered is incorrect. Please check your credentials and try again.';
    
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Try signing in instead.';
    
    case 'auth/weak-password':
      return 'Your password is too weak. It must be at least 6 characters long.';
    
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    
    case 'auth/operation-not-allowed':
      return 'Email and password sign-in is currently disabled. Please contact the protocol administrator.';
    
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Access to this account has been temporarily disabled. Please try again later.';
    
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
      
    case 'auth/network-request-failed':
      return 'A network error occurred. Please check your internet connection and try again.';

    case 'auth/popup-closed-by-user':
      return 'The sign-in popup was closed before completion. Please try again.';

    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for Google Sign-In. Please add this URL to your Firebase Console Authorized Domains.';

    default:
      if (error?.message?.includes('auth/invalid-credential')) {
        return 'The email or password you entered is incorrect. Please check your credentials and try again.';
      }
      return error?.message || 'An unexpected authentication error occurred. Please try again.';
  }
};
