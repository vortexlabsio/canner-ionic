import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  getAuth,
  signOut,
} from 'firebase/auth';

 const API_KEY = process.env.REACT_APP_API_KEY; 
 const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN; 
 const PROJECT_ID = process.env.REACT_APP_PROJECT_ID; 
 const STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET; 
 const MESSAGING_ID = process.env.REACT_APP_MESSAGING_SENDER_ID; 
 const APP_ID = process.env.REACT_APP_APPID; 
 const MEASUREMENT_ID = process.env.REACT_APP_MEASUREMENT_ID; 

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    // Add a new document with a generated id.

    if (querySnapshot.empty) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "facebook",
        email: user.email,
      });

    }
  } catch (err) {
    const e = err as Error;
    console.error(e);
    alert(e.message);
  }
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    // Add a new document with a generated id.

    if (querySnapshot.empty) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });

    }
  } catch (err) {
    const e = err as Error;
    console.error(e);
    alert(e.message);
  }
};

const emailAndPasswordSignIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    const e = err as Error;
    console.error(e);
    alert(e.message);
  }
};

const emailAndPasswordRegistration = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
    });
  } catch (err) {
    const e = err as Error;
    console.error(e);
    alert(e.message);
  }
};

const sendPasswordResetEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    const e = err as Error;
    console.error(e);
    alert(e.message);
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    const e = err as Error;
    console.error(e);
    alert(e.message);
  }
};

export {
  auth,
  db,
  signInWithFacebook,
  signInWithGoogle,
  emailAndPasswordSignIn,
  emailAndPasswordRegistration,
  sendPasswordResetEmail,
  logoutUser,
};