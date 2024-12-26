import firebase from 'firebase/app';

import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: process.env.apikey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

firebase.initializeApp(firebaseConfig);

const app=firebase.initializeApp(firebaseConfig);
export const database = getDatabase(app);
