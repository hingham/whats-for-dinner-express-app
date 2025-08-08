import express from 'express';
import { getAllDocuments, getDocumentById, addDocument, updateDocument, deleteDocument } from '../services/datastoreService';

const router = express.Router();

type CollectionName = 'base-freezer-recipes' | 'freezer-recipes' | 'fresh-freezer-base-recipes';

const collectionToIdPrefix: Record<CollectionName, string> = {
    'base-freezer-recipes': 'frozenBase',
    'freezer-recipes': 'frozenRecipes',
    'fresh-freezer-base-recipes': 'freshRecipes',
}

// Example route to fetch all documents from a collection
router.get('/:collectionName', async (req, res) => {
  const { collectionName } = req.params;

  try {
    const documents = await getAllDocuments(collectionName);
    documents.forEach((doc: any) => {
        // Add a prefix to the ID based on the collection name
        if (collectionToIdPrefix[collectionName as CollectionName]) {
            doc.id = `${collectionToIdPrefix[collectionName as CollectionName]}#${doc.id}`;
        }
    })
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Example route to fetch a document by ID
router.get('/:collectionName/:docId', async (req, res) => {
  const { collectionName, docId } = req.params;
  try {
    const document = await getDocumentById(collectionName, docId);
    res.status(200).json(document);
  } catch (error) {
    res.status(404).json({ error: (error as Error)?.message });
  }
});

export default router;
