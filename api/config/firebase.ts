import dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin';

const projectId = process.env.PROJECT_ID || 'whats-for-dinner-f80b4';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
});

// Document-based no sql datastorage (used instead of admin.database) for better query support
const db = admin.firestore();

export default db;
