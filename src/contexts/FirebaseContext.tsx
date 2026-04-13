import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc, getDocs, collection, query, where, orderBy, limit, addDoc, updateDoc, increment } from 'firebase/firestore';
import { Space, Member, Post } from '../types';

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  currentSpace: Space | null;
  currentMember: Member | null;
  posts: Post[];
  joinSpace: (code: string, nickname: string) => Promise<void>;
  createSpace: (name: string) => Promise<void>;
  createPost: (content: string, tag?: string) => Promise<void>;
  echoPost: (postId: string) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSpace, setCurrentSpace] = useState<Space | null>(null);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  // Listen for posts if in a space
  useEffect(() => {
    if (!currentSpace) {
      setPosts([]);
      return;
    }

    const path = `spaces/${currentSpace.id}/posts`;
    const q = query(
      collection(db, path),
      where('isHidden', '==', false),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(newPosts);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [currentSpace]);

  const createSpace = async (name: string) => {
    if (!user) return;
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const spaceData: Omit<Space, 'id'> = {
      name: name.toUpperCase(),
      inviteCode,
      vibeMode: 'open',
      roomTemp: 'chill',
      adminMemberId: user.uid,
      maxMembers: 30,
      cooldownMinutes: 0,
      proTier: false,
      createdAt: Date.now()
    };

    try {
      const docRef = await addDoc(collection(db, 'spaces'), spaceData);
      const space = { id: docRef.id, ...spaceData } as Space;
      setCurrentSpace(space);
      
      // Add creator as admin member
      const memberData: Member = {
        id: user.uid,
        uid: user.uid,
        spaceId: docRef.id,
        displayAlias: 'Admin Ghost',
        joinedAt: Date.now(),
        isAdmin: true,
        flagCount: 0
      };
      await setDoc(doc(db, `spaces/${docRef.id}/members`, user.uid), memberData);
      setCurrentMember(memberData);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'spaces');
    }
  };

  const joinSpace = async (code: string, nickname: string) => {
    if (!user) return;
    const q = query(collection(db, 'spaces'), where('inviteCode', '==', code.toUpperCase()), limit(1));
    
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error('Space not found');
      }

      const spaceDoc = querySnapshot.docs[0];
      const space = { id: spaceDoc.id, ...spaceDoc.data() } as Space;
      
      const memberData: Member = {
        id: user.uid,
        uid: user.uid,
        spaceId: space.id,
        displayAlias: nickname,
        joinedAt: Date.now(),
        isAdmin: false,
        flagCount: 0
      };
      
      await setDoc(doc(db, `spaces/${space.id}/members`, user.uid), memberData);
      setCurrentSpace(space);
      setCurrentMember(memberData);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'members');
    }
  };

  const createPost = async (content: string, tag?: string) => {
    if (!user || !currentSpace) return;
    const path = `spaces/${currentSpace.id}/posts`;
    const postData = {
      spaceId: currentSpace.id,
      authorUid: user.uid,
      content,
      tag: tag || null,
      echoCount: 0,
      isHidden: false,
      isPinned: false,
      createdAt: Date.now()
    };

    try {
      await addDoc(collection(db, path), postData);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const echoPost = async (postId: string) => {
    if (!currentSpace) return;
    const path = `spaces/${currentSpace.id}/posts/${postId}`;
    try {
      await updateDoc(doc(db, path), {
        echoCount: increment(1)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  return (
    <FirebaseContext.Provider value={{ 
      user, 
      loading, 
      currentSpace, 
      currentMember, 
      posts, 
      joinSpace, 
      createSpace, 
      createPost,
      echoPost
    }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
