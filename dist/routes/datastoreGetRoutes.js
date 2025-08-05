"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const datastoreService_1 = require("../services/datastoreService");
const router = express_1.default.Router();
const collectionToIdPrefix = {
    'base-freezer-recipes': 'frozenBase',
    'freezer-recipes': 'frozenRecipes',
    'fresh-freezer-base-recipes': 'freshRecipes',
};
// Example route to fetch all documents from a collection
router.get('/:collectionName', async (req, res) => {
    const { collectionName } = req.params;
    console.log({ collectionName });
    try {
        const documents = await (0, datastoreService_1.getAllDocuments)(collectionName);
        documents.forEach((doc) => {
            // Add a prefix to the ID based on the collection name
            if (collectionToIdPrefix[collectionName]) {
                doc.id = `${collectionToIdPrefix[collectionName]}#${doc.id}`;
            }
        });
        res.status(200).json(documents);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Example route to fetch a document by ID
router.get('/:collectionName/:docId', async (req, res) => {
    const { collectionName, docId } = req.params;
    try {
        const document = await (0, datastoreService_1.getDocumentById)(collectionName, docId);
        res.status(200).json(document);
    }
    catch (error) {
        res.status(404).json({ error: error?.message });
    }
});
exports.default = router;
