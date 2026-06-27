import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, writeBatch, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { UserAccount, SRSCard, UserError } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyApZowLAGoBcEJokeOWgV_aZouJeTcDCG8",
  authDomain: "gen-lang-client-0594242992.firebaseapp.com",
  projectId: "gen-lang-client-0594242992",
  storageBucket: "gen-lang-client-0594242992.firebasestorage.app",
  messagingSenderId: "871931779795",
  appId: "1:871931779795:web:871be490ee4d2108eed226"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app, "ai-studio-espanholdodiaadi-c6bc7852-3c37-4a0e-a3f6-367e6f3c24da");

export interface FirestoreUserRecord {
  details: UserAccount;
  password?: string;
}

// Fetch user profile & login info
export async function fetchUserRecord(username: string): Promise<FirestoreUserRecord | null> {
  try {
    const cleanUsername = username.trim().toLowerCase();
    const docRef = doc(db, 'users', cleanUsername);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as FirestoreUserRecord;
    }
  } catch (err) {
    console.error('Error fetching user record:', err);
  }
  return null;
}

// Save or register user profile
export async function saveUserRecord(username: string, record: FirestoreUserRecord): Promise<void> {
  try {
    const cleanUsername = username.trim().toLowerCase();
    const docRef = doc(db, 'users', cleanUsername);
    await setDoc(docRef, record, { merge: true });
  } catch (err) {
    console.error('Error saving user record:', err);
    throw err;
  }
}

// Fetch all SRS Cards for a user
export async function fetchUserSrsCards(username: string): Promise<SRSCard[]> {
  try {
    const cleanUsername = username.trim().toLowerCase();
    const colRef = collection(db, 'users', cleanUsername, 'cards');
    const snap = await getDocs(colRef);
    const cards: SRSCard[] = [];
    snap.forEach((doc) => {
      cards.push(doc.data() as SRSCard);
    });
    return cards;
  } catch (err) {
    console.error('Error fetching user SRS cards:', err);
    return [];
  }
}

// Save or sync multiple SRS Cards for a user
export async function syncUserSrsCards(username: string, cards: SRSCard[]): Promise<void> {
  try {
    if (cards.length === 0) return;
    const cleanUsername = username.trim().toLowerCase();
    const batch = writeBatch(db);
    
    for (const card of cards) {
      const docRef = doc(db, 'users', cleanUsername, 'cards', card.id);
      batch.set(docRef, card, { merge: true });
    }
    
    await batch.commit();
  } catch (err) {
    console.error('Error syncing user SRS cards:', err);
  }
}

// Delete an SRS Card
export async function deleteUserSrsCard(username: string, cardId: string): Promise<void> {
  try {
    const cleanUsername = username.trim().toLowerCase();
    const docRef = doc(db, 'users', cleanUsername, 'cards', cardId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Error deleting SRS card:', err);
  }
}

// Fetch all User Errors for a user
export async function fetchUserErrors(username: string): Promise<UserError[]> {
  try {
    const cleanUsername = username.trim().toLowerCase();
    const colRef = collection(db, 'users', cleanUsername, 'errors');
    const snap = await getDocs(colRef);
    const errors: UserError[] = [];
    snap.forEach((doc) => {
      errors.push(doc.data() as UserError);
    });
    return errors;
  } catch (err) {
    console.error('Error fetching user errors:', err);
    return [];
  }
}

// Save or sync multiple errors
export async function syncUserErrors(username: string, errors: UserError[]): Promise<void> {
  try {
    if (errors.length === 0) return;
    const cleanUsername = username.trim().toLowerCase();
    const batch = writeBatch(db);
    
    for (const error of errors) {
      const docRef = doc(db, 'users', cleanUsername, 'errors', error.id);
      batch.set(docRef, error, { merge: true });
    }
    
    await batch.commit();
  } catch (err) {
    console.error('Error syncing user errors:', err);
  }
}

// Delete a tracked error
export async function deleteUserError(username: string, errorId: string): Promise<void> {
  try {
    const cleanUsername = username.trim().toLowerCase();
    const docRef = doc(db, 'users', cleanUsername, 'errors', errorId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Error deleting user error:', err);
  }
}

// Clear all tracked errors
export async function clearAllUserErrors(username: string, errors: UserError[]): Promise<void> {
  try {
    const cleanUsername = username.trim().toLowerCase();
    const batch = writeBatch(db);
    for (const error of errors) {
      const docRef = doc(db, 'users', cleanUsername, 'errors', error.id);
      batch.delete(docRef);
    }
    await batch.commit();
  } catch (err) {
    console.error('Error clearing all user errors:', err);
  }
}
