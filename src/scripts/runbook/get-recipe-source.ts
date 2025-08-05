// /*
// Description:
//   Get list of ingredients for all recipes
// */

// import { Recipe } from '../models/recipe';

// // import * as fs from 'fs/promises'
// const fs = require('fs/promises');

// const getRecipeSource = async () => {
//   try {
//     // Read from recipes JSON TODO: create json file from typescript file
//     const data = await fs.readFile('../src/source/json-data/recipes-to-freeze.json', 'utf8') || JSON.stringify([]);
//     const dataParsed: Array<Recipe> = JSON.parse(data);

//     // Update json file
//     dataParsed.forEach((recipe) => {
//       console.log(recipe.name, recipe.source);
//     });
//   } catch (err) {
//     console.error(`error: ${err}`);
//   }
// };

// getRecipeSource();
