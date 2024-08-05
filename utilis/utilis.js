import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNXIdGU4-ywJ-9T8vuLRNAd8G5F-moRaU",
  authDomain: "wma-11-project.firebaseapp.com",
  projectId: "wma-11-project",
  storageBucket: "wma-11-project.appspot.com",
  messagingSenderId: "417433878984",
  appId: "1:417433878984:web:8445d98e71efc8069f80fd",
  measurementId: "G-YF9N95Z5S3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
//--------------------------------------------//
//--------------------------------------------//
const analytics = getAnalytics(app);
// console.log(auth);

export {
  auth,
  storage,
  db,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  doc,
  setDoc,
  getDoc,
  getDocs,
  ref,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  uploadBytes,
  getDownloadURL,
  collection,
  query,
  where,
};
