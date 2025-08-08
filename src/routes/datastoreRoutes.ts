import express from 'express';
import { getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument } from '../services/datastoreService';

const router = express.Router();
// Example route to add a new document
router.post('/:collectionName', async (req, res) => {
  const { collectionName } = req.params;
  const data = req.body;
  try {
    const newDocument = await addDocument(collectionName, data);
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ error:  (error as Error)?.message });
  }
});

// Example route to update a document
router.put('/:collectionName/:docId', async (req, res) => {
  const { collectionName, docId } = req.params;
  const data = req.body;
  try {
    const updatedDocument = await updateDocument(collectionName, docId, data);
    res.status(200).json(updatedDocument);
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message });
  }
});

// Example route to delete a document
router.delete('/:collectionName/:docId', async (req, res) => {
  const { collectionName, docId } = req.params;
  try {
    const deletedDocument = await deleteDocument(collectionName, docId);
    res.status(200).json(deletedDocument);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;