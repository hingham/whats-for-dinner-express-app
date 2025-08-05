"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const firebase_1 = __importDefault(require("../config/firebase"));
const validateModelFunction_1 = require("./validateModelFunction");
const validateFreezerRecipes_1 = require("./validateFreezerRecipes");
/**
 * Uploads a JSON object to the Firestore collection.
 * @param filePath - Path to the JSON file.
 * @param collectionName - Firestore collection name.
 */
const uploadRecipes = async (filePath, collectionName) => {
    try {
        // Read and parse the JSON file
        const fileContent = fs_1.default.readFileSync(path_1.default.resolve(filePath), 'utf-8');
        const recipes = JSON.parse(fileContent);
        recipes.forEach(async (recipe) => {
            // Validate the recipe object
            if (!(0, validateModelFunction_1.validateFreshFrozenBaseRecipe)(recipe)) {
                throw new Error('Invalid JSON structure. Object does not match the Recipes type.');
            }
            const extraKeys = (0, validateModelFunction_1.getExcessKeys)(recipe);
            extraKeys.push('id'); // Since firebase adds it's own id we should delete the one added in the json
            for (const key of extraKeys) {
                console.warn(`Warning: Extra key "${key}" found in recipe object. This key will be deleted.`);
                delete recipe[key];
            }
            // Upload the object to Firestore
            const docRef = await firebase_1.default.collection(collectionName).add(recipe);
            console.log(`Document uploaded successfully with ID: ${docRef.id}`);
        });
    }
    catch (error) {
        console.error('Error uploading document:', error.message);
    }
};
/**
 * Uploads a JSON object to the Firestore collection.
 * @param filePath - Path to the JSON file.
 * @param collectionName - Firestore collection name.
 */
const uploadFreezerRecipes = async (filePath, collectionName) => {
    try {
        // Read and parse the JSON file
        const fileContent = fs_1.default.readFileSync(path_1.default.resolve(filePath), 'utf-8');
        const recipes = JSON.parse(fileContent);
        recipes.forEach(async (recipe) => {
            // Validate the recipe object
            if (!(0, validateFreezerRecipes_1.validateFreezerRecipe)(recipe)) {
                throw new Error('Invalid JSON structure. Object does not match the Recipes type.');
            }
            const extraKeys = (0, validateFreezerRecipes_1.getFreezerExcessKeys)(recipe);
            // Since firebase adds it's own id we should delete the one added in the json
            // Except in the case of base-freezer-recipes for now
            // extraKeys.push('id')
            for (const key of extraKeys) {
                console.warn(`Warning: Extra key "${key}" found in recipe object. This key will be deleted.`);
                delete recipe[key];
            }
            // Upload the object to Firestore
            const docRef = await firebase_1.default.collection(collectionName).add(recipe);
            console.log(`Document uploaded successfully with ID: ${docRef.id}`);
        });
    }
    catch (error) {
        console.error('Error uploading document:', error.message);
    }
};
// Example usage
const filePath = './json-data/recipes-fresh-frozen-base.json'; // Path to your JSON file
const collectionName = 'fresh-freezer-base-recipes'; // Firestore collection name
// uploadRecipes(filePath, collectionName);
uploadFreezerRecipes('./json-data/freezer-base-recipes.json', 'base-freezer-recipes'); // Firestore collection name for freezer recipes
