import { initializeApp, FirebaseApp } from 'firebase/app';

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDING_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} = process.env;
console.log('🚀  FIREBASE_MEASUREMENT_ID:', FIREBASE_MEASUREMENT_ID);

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDING_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

export class Firebase {
  constructor(
    private readonly app: FirebaseApp = initializeApp(firebaseConfig),
  ) {}

  getApp = () => {
    return this.app;
  };
}
