import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  getDocs, 
  onSnapshot,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserSettings, HabitLog, SelfAssessment, CaregiverNote } from '../types';

export const saveUserSettings = async (userId: string, settings: UserSettings) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, { settings, updatedAt: serverTimestamp() }, { merge: true });
};

export const getUserSettings = async (userId: string): Promise<UserSettings | null> => {
  const userRef = doc(db, 'users', userId);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return snap.data().settings as UserSettings;
  }
  return null;
};

export const saveHabitLog = async (userId: string, log: HabitLog) => {
  const logRef = doc(db, 'users', userId, 'habit_logs', log.date);
  await setDoc(logRef, { ...log, updatedAt: serverTimestamp() });
};

export const getHabitLogs = async (userId: string): Promise<Record<string, HabitLog>> => {
  const logsRef = collection(db, 'users', userId, 'habit_logs');
  const snap = await getDocs(logsRef);
  const logs: Record<string, HabitLog> = {};
  snap.forEach(doc => {
    logs[doc.id] = doc.data() as HabitLog;
  });
  return logs;
};

export const saveAssessment = async (userId: string, assessment: SelfAssessment) => {
  const ref = doc(db, 'users', userId, 'assessments', assessment.id);
  await setDoc(ref, { ...assessment, updatedAt: serverTimestamp() });
};

export const getAssessments = async (userId: string): Promise<SelfAssessment[]> => {
  const ref = collection(db, 'users', userId, 'assessments');
  const q = query(ref, orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as SelfAssessment);
};

export const saveCaregiverNote = async (userId: string, note: CaregiverNote) => {
  const ref = doc(db, 'users', userId, 'caregiver_notes', note.id);
  await setDoc(ref, { ...note, updatedAt: serverTimestamp() });
};

export const getCaregiverNotes = async (userId: string): Promise<CaregiverNote[]> => {
  const ref = collection(db, 'users', userId, 'caregiver_notes');
  const q = query(ref, orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data() as CaregiverNote);
};

export const saveCompletedDays = async (userId: string, days: number[]) => {
  const ref = doc(db, 'users', userId, 'progress', 'completed_days');
  await setDoc(ref, { days, updatedAt: serverTimestamp() });
};

export const getCompletedDays = async (userId: string): Promise<number[]> => {
  const ref = doc(db, 'users', userId, 'progress', 'completed_days');
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data().days as number[];
  }
  return [];
};
