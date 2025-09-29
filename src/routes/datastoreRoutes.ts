import express from 'express';
import { getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument } from '../services/datastoreService';
import { prefixToCollectionName } from '../utils/constants'

const router = express.Router();
// Example route to add a new document
router.post('/:collectionName', async (req, res) => {
  const { collectionName } = req.params;
  const data = req.body;
  try {
    const {id, ...body} = data
    const newDocument = await addDocument(collectionName, body);
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(500).json({ error:  (error as Error)?.message });
  }
});

// Example route to update a document
router.put('/:urlCollectionName/:docUuid', async (req, res) => {
  const { urlCollectionName, docUuid } = req.params;
  let docId: string = docUuid;

  const collectionName = prefixToCollectionName[urlCollectionName]
   // Add the correct collection mapping here for other collections
  const data = req.body.recipe;
  const { id, ...dataForUpdate } = data;
  try {
    const updatedDocument = await updateDocument(collectionName, docId, dataForUpdate);
    res.status(200).json(updatedDocument);
  } catch (error) {
    console.error(error)
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