"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.addDocument = exports.getDocumentById = exports.getAllDocuments = void 0;
const firebase_1 = __importDefault(require("../config/firebase"));
/**
 * Fetch all documents from a collection.
 * @param collectionName - Name of the Firestore collection.
 */
const getAllDocuments = async (collectionName) => {
    const snapshot = await firebase_1.default.collection(collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
exports.getAllDocuments = getAllDocuments;
/**
 * Fetch a single document by ID.
 * @param collectionName - Name of the Firestore collection.
 * @param docId - Document ID.
 */
const getDocumentById = async (collectionName, docId) => {
    const doc = await firebase_1.default.collection(collectionName).doc(docId).get();
    if (!doc.exists) {
        throw new Error('Document not found');
    }
    return { id: doc.id, ...doc.data() };
};
exports.getDocumentById = getDocumentById;
/**
 * Add a new document to a collection.
 * @param collectionName - Name of the Firestore collection.
 * @param data - Data to add.
 */
const addDocument = async (collectionName, data) => {
    const docRef = await firebase_1.default.collection(collectionName).add(data);
    return { id: docRef.id, ...data };
};
exports.addDocument = addDocument;
/**
 * Update an existing document.
 * @param collectionName - Name of the Firestore collection.
 * @param docId - Document ID.
 * @param data - Data to update.
 */
const updateDocument = async (collectionName, docId, data) => {
    await firebase_1.default.collection(collectionName).doc(docId).update(data);
    return { id: docId, ...data };
};
exports.updateDocument = updateDocument;
/**
 * Delete a document by ID.
 * @param collectionName - Name of the Firestore collection.
 * @param docId - Document ID.
 */
const deleteDocument = async (collectionName, docId) => {
    await firebase_1.default.collection(collectionName).doc(docId).delete();
    return { id: docId };
};
exports.deleteDocument = deleteDocument;
