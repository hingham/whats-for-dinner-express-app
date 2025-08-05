import db from '../config/firebase';

/**
 * Fetch all documents from a collection.
 * @param collectionName - Name of the Firestore collection.
 */
export const getAllDocuments = async (collectionName: string) => {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Fetch a single document by ID.
 * @param collectionName - Name of the Firestore collection.
 * @param docId - Document ID.
 */
export const getDocumentById = async (collectionName: string, docId: string) => {
  const doc = await db.collection(collectionName).doc(docId).get();
  if (!doc.exists) {
    throw new Error('Document not found');
  }
  return { id: doc.id, ...doc.data() };
};

/**
 * Add a new document to a collection.
 * @param collectionName - Name of the Firestore collection.
 * @param data - Data to add.
 */
export const addDocument = async (collectionName: string, data: Record<string, any>) => {
  const docRef = await db.collection(collectionName).add(data);
  return { id: docRef.id, ...data };
};

/**
 * Update an existing document.
 * @param collectionName - Name of the Firestore collection.
 * @param docId - Document ID.
 * @param data - Data to update.
 */
export const updateDocument = async (collectionName: string, docId: string, data: Record<string, any>) => {
  await db.collection(collectionName).doc(docId).update(data);
  return { id: docId, ...data };
};

/**
 * Delete a document by ID.
 * @param collectionName - Name of the Firestore collection.
 * @param docId - Document ID.
 */
export const deleteDocument = async (collectionName: string, docId: string) => {
  await db.collection(collectionName).doc(docId).delete();
  return { id: docId };
};
