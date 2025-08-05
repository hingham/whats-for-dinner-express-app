import fs from 'fs';
import path from 'path';
import db from '../config/firebase';


// TODO: Upload / port over recipe model
import { FreezerRecipe, FreshFrozenBaseRecipe } from '../models/recipe';
import { getExcessKeys, validateFreshFrozenBaseRecipe } from './validateModelFunction'
import { validateFreezerRecipe, getFreezerExcessKeys } from './validateFreezerRecipes';

/**
 * Uploads a JSON object to the Firestore collection.
 * @param filePath - Path to the JSON file.
 * @param collectionName - Firestore collection name.
 */
const uploadRecipes = async (filePath: string, collectionName: string) => {
    try {
        // Read and parse the JSON file
        const fileContent = fs.readFileSync(path.resolve(filePath), 'utf-8');
        const recipes = JSON.parse(fileContent);

        recipes.forEach(async (recipe: FreshFrozenBaseRecipe) => {

            // Validate the recipe object
            if (!validateFreshFrozenBaseRecipe(recipe)) {
                throw new Error('Invalid JSON structure. Object does not match the Recipes type.');
            }

            const extraKeys = getExcessKeys(recipe);
            extraKeys.push('id') // Since firebase adds it's own id we should delete the one added in the json
            for (const key of extraKeys) {
                console.warn(`Warning: Extra key "${key}" found in recipe object. This key will be deleted.`);
                delete recipe[key as keyof FreshFrozenBaseRecipe];
            }
            // Upload the object to Firestore
            const docRef = await db.collection(collectionName).add(recipe);
            console.log(`Document uploaded successfully with ID: ${docRef.id}`);
        })

    } catch (error) {
        console.error('Error uploading document:', (error as Error).message);
    }
};

/**
 * Uploads a JSON object to the Firestore collection.
 * @param filePath - Path to the JSON file.
 * @param collectionName - Firestore collection name.
 */
const uploadFreezerRecipes = async (filePath: string, collectionName: string) => {
    try {
        // Read and parse the JSON file
        const fileContent = fs.readFileSync(path.resolve(filePath), 'utf-8');
        const recipes = JSON.parse(fileContent);

        recipes.forEach(async (recipe: FreezerRecipe) => {

            // Validate the recipe object
            if (!validateFreezerRecipe(recipe)) {
                throw new Error('Invalid JSON structure. Object does not match the Recipes type.');
            }

            const extraKeys = getFreezerExcessKeys(recipe);
            // Since firebase adds it's own id we should delete the one added in the json
            // Except in the case of base-freezer-recipes for now
            // extraKeys.push('id')
            for (const key of extraKeys) {
                console.warn(`Warning: Extra key "${key}" found in recipe object. This key will be deleted.`);
                delete recipe[key as keyof FreezerRecipe];
            }
            // Upload the object to Firestore
            const docRef = await db.collection(collectionName).add(recipe);
            console.log(`Document uploaded successfully with ID: ${docRef.id}`);
        })

    } catch (error) {
        console.error('Error uploading document:', (error as Error).message);
    }
};

// Example usage
const filePath = './json-data/recipes-fresh-frozen-base.json'; // Path to your JSON file
const collectionName = 'fresh-freezer-base-recipes'; // Firestore collection name
// uploadRecipes(filePath, collectionName);

uploadFreezerRecipes('./json-data/freezer-base-recipes.json', 'base-freezer-recipes'); // Firestore collection name for freezer recipes