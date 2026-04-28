import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc,
  doc,
  query, 
  orderBy, 
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PROJECTS, SKILLS, SERVICES, BLOG_POSTS } from '../lib/seed';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      isSignedIn: !!localStorage.getItem('firebase_auth_token'), 
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Generate IDs for local fallback data to mimic Firestore documents
const generateFallbackData = (dataArray: any[], prefix: string) => {
  return dataArray.map((item, index) => ({
    id: `local-${prefix}-${index}`,
    ...item,
    createdAt: new Date(Date.now() - index * 86400000)
  }));
};

const LOCAL_PROJECTS = generateFallbackData(PROJECTS, 'proj');
const LOCAL_SKILLS = generateFallbackData(SKILLS, 'skill');
const LOCAL_SERVICES = generateFallbackData(SERVICES, 'serv');
const LOCAL_BLOG_POSTS = generateFallbackData(BLOG_POSTS, 'blog');

// Helper to timeout a promise
const withTimeout = <T>(promise: Promise<T>, ms: number = 2500): Promise<T> => {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => reject(new Error('Timeout')), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
};

export const firebaseService = {
  async getProjects() {
    try {
      const q = query(collection(db, 'projects'));
      const snapshot = await withTimeout(getDocs(q));
      if (snapshot.empty) return LOCAL_PROJECTS;
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return LOCAL_PROJECTS;
    }
  },

  async getSkills() {
    try {
      const q = query(collection(db, 'skills'));
      const snapshot = await withTimeout(getDocs(q));
      if (snapshot.empty) return LOCAL_SKILLS;
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return LOCAL_SKILLS;
    }
  },

  async updateSkill(id: string, data: any) {
    try {
      if (id.startsWith('local-')) throw new Error("Cannot update local fallback data");
      const docRef = doc(db, 'skills', id);
      await updateDoc(docRef, data);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `skills/${id}`);
    }
  },

  async getServices() {
    try {
      const q = query(collection(db, 'services'));
      const snapshot = await withTimeout(getDocs(q));
      if (snapshot.empty) return LOCAL_SERVICES;
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
       return LOCAL_SERVICES;
    }
  },

  async submitContact(data: any) {
    try {
      await addDoc(collection(db, 'contacts'), {
        ...data,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'contacts');
    }
  },

  async getBlogPosts() {
    try {
      const q = query(collection(db, 'blogPosts'));
      const snapshot = await withTimeout(getDocs(q));
      if (snapshot.empty) return LOCAL_BLOG_POSTS;
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
       return LOCAL_BLOG_POSTS;
    }
  },

  async getBlogPost(id: string) {
    try {
      if (id.startsWith('local-blog-')) {
        return LOCAL_BLOG_POSTS.find(post => post.id === id) || null;
      }
      const { getDoc } = await import('firebase/firestore');
      const docRef = doc(db, 'blogPosts', id);
      const docSnap = await withTimeout(getDoc(docRef));
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      return LOCAL_BLOG_POSTS.find(post => post.id === id) || null;
    }
  }
};

