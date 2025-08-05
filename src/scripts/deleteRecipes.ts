import fs from 'fs';
import path from 'path';
import db from '../config/firebase';


// TODO: Upload / port over recipe model
import { FreshFrozenBaseRecipe } from '../models/recipe';
import { getExcessKeys, validateFreshFrozenBaseRecipe } from './validateModelFunction'

/**
 * Uploads a JSON object to the Firestore collection.
 * @param filePath - Path to the JSON file.
 * @param collectionName - Firestore collection name.
 */
const deleteRecipes = async (collectionName: string) => {
    try {
        // Read and parse the JSON file
        const fileContent = fs.readFileSync(path.resolve(filePath), 'utf-8');
        const recipes = await db.collection(collectionName).get() as unknown as FreshFrozenBaseRecipe[];

        recipes.forEach(async (recipe: FreshFrozenBaseRecipe) => {

            // Validate the recipe object

           const res = await db.collection(collectionName).doc(recipe.id).delete();
            console.log(`Document deleted: ${res}`);
        })

    } catch (error) {
        console.error('Error uploading document:', (error as Error).message);
    }
};

// Example usage
const filePath = './json-data/recipes-fresh-frozen-base.json'; // Path to your JSON file
const collectionName = 'fresh-freezer-base-recipes'; // Firestore collection name
deleteRecipes(collectionName);