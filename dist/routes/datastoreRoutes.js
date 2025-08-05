"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const datastoreService_1 = require("../services/datastoreService");
const router = express_1.default.Router();
// Example route to add a new document
router.post('/:collectionName', async (req, res) => {
    const { collectionName } = req.params;
    const data = req.body;
    try {
        const newDocument = await (0, datastoreService_1.addDocument)(collectionName, data);
        res.status(201).json(newDocument);
    }
    catch (error) {
        res.status(500).json({ error: error?.message });
    }
});
// Example route to update a document
router.put('/:collectionName/:docId', async (req, res) => {
    const { collectionName, docId } = req.params;
    const data = req.body;
    try {
        const updatedDocument = await (0, datastoreService_1.updateDocument)(collectionName, docId, data);
        res.status(200).json(updatedDocument);
    }
    catch (error) {
        res.status(500).json({ error: error?.message });
    }
});
// Example route to delete a document
router.delete('/:collectionName/:docId', async (req, res) => {
    const { collectionName, docId } = req.params;
    try {
        const deletedDocument = await (0, datastoreService_1.deleteDocument)(collectionName, docId);
        res.status(200).json(deletedDocument);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
