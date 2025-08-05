"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const projectId = process.env.PROJECT_ID || 'whats-for-dinner-f80b4';
console.log({ projectId, creds: process.env.GOOGLE_APPLICATION_CREDENTIALS });
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault(),
    databaseURL: `https://${projectId}.firebaseio.com`,
    projectId,
});
// Document-based no sql datastorage (used instead of admin.database) for better query support
const db = firebase_admin_1.default.firestore();
console.log({ db });
exports.default = db;
