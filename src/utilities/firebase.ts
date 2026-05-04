import { FirebaseOptions, getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    throw new Error(
      `Firebase Initialization Error: ${key} is missing. check your .env.local file.`,
    );
  }
});

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export { app };
