"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const firebase_1 = __importDefault(require("../config/firebase"));
/**
 * Uploads a JSON object to the Firestore collection.
 * @param filePath - Path to the JSON file.
 * @param collectionName - Firestore collection name.
 */
const deleteRecipes = async (collectionName) => {
    try {
        // Read and parse the JSON file
        const fileContent = fs_1.default.readFileSync(path_1.default.resolve(filePath), 'utf-8');
        const recipes = await firebase_1.default.collection(collectionName).get();
        recipes.forEach(async (recipe) => {
            // Validate the recipe object
            const res = await firebase_1.default.collection(collectionName).doc(recipe.id).delete();
            console.log(`Document deleted: ${res}`);
        });
    }
    catch (error) {
        console.error('Error uploading document:', error.message);
    }
};
// Example usage
const filePath = './json-data/recipes-fresh-frozen-base.json'; // Path to your JSON file
const collectionName = 'fresh-freezer-base-recipes'; // Firestore collection name
deleteRecipes(collectionName);
