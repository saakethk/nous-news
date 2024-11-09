
import { getApps, initializeApp, getApp } from "@firebase/app";
import { initializeFirestore, setLogLevel } from "@firebase/firestore";

setLogLevel('debug');

console.log(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY
)

// Credentials
const firebaseConfig = {
  databaseURL: 'https://'+process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID+'.firebaseio.com',
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

export { app, db }