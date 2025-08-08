/* eslint-disable @typescript-eslint/no-var-requires */
import { Recipe, SubRecipe } from '../../models/recipe';
const fs = require('fs/promises');
import { v4 as uuidv4 } from 'uuid';

const fileToRead = '../../../json-data/recipes-fresh-frozen-base.json'
const fileToWrite = '../../../json-data/recipes-fresh-frozen-base.json'

const updateRecipeJson = async () => {
  try {
    // Read from recipes JSON TODO: create json file from typescript file
    const data = await fs.readFile('../src/source/json-data/recipes-to-freeze.json', 'utf8') || JSON.stringify([]);

    // Parse the JSON data
    const recipes = JSON.parse(data) as Recipe[];

    // Add 'image' property to each element
    const updatedRecipes = recipes.map(recipe => {
      // eslint-disable-next-line no-param-reassign
      recipe.id = uuidv4();
      return recipe;
    });

    // Write the new file
    await fs.writeFile('../src/source/json-data/recipes-to-freeze.json', JSON.stringify(updatedRecipes));
  } catch (err) {
    console.error(`error: ${err}`);
  }
};

const updateRecipeSubrecipe = async () => {
  try {
    // Read from recipes JSON TODO: create json file from typescript file
    const data = await fs.readFile(fileToWrite, 'utf8') || JSON.stringify([]);

    // Parse the JSON data
    const recipes = JSON.parse(data) as Recipe[] | any[];

    const updatedRecipes = recipes.map(recipe => {
      // eslint-disable-next-line no-param-reassign

      recipe.subRecipes = {}
      
      return recipe;
    });

    // Write the new file
    await fs.writeFile(fileToWrite, JSON.stringify(updatedRecipes));
  } catch (err) {
    console.error(`error: ${err}`);
  }
};

updateRecipeSubrecipe().then(() => {
  return 'success';
}).then(() => {
  console.log('success');
}).catch((err) => {
  console.error(err);
});
