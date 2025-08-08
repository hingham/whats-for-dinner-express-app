import dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin';

const projectId = process.env.PROJECT_ID || 'whats-for-dinner-f80b4';
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
});

// Document-based no sql datastorage (used instead of admin.database) for better query support
const db = admin.firestore();

export default db;
