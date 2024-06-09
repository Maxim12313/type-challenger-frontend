import { auth } from '@/app/auth/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification
} from 'firebase/auth';

export const doSignUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const doLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const doSignWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const result = signInWithPopup(auth, provider);
  return result
}

export const doSignOut = () => {
  return auth.signOut();
}

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
}

export const doEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: window.location.origin + '/home'
  });
}