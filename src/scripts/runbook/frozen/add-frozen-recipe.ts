// /* Description:
// Reads in ingredients and instructions

// Creates json typed recipe and updates the json file which stores all frozen recipes
// */

// import { MeasurementUS } from 'models/enums';
// import { Directions, Ingredient, Recipe } from 'models/recipe';
// import { v4 as uuidv4 } from 'uuid';

// // import * as fs from 'fs/promises'
// const fs = require('fs/promises');

// const newRecipe = async (name: string, source: string): Promise<Recipe> => {
//   const ingredients = await getIngredients('ingredients.txt');

//   const directions = await getDirections('instructions.txt');

//   const recipe: Recipe = {
//     ingredients,
//     directions,
//     name,
//     link: '',
//     freezer: true,
//     id: uuidv4(),
//     broadCategory: '',
//     nutritionNeeds: [],
//     budget: 'midBudget',
//     season: ['fall', 'winter'],
//     leftOverNotes: '',
//     notes: '',
//     comments: [],
//     neighbors: [],
//     region: 'northwest',
//     nutrition: {},
//     source,
//     image: ''
//   };

//   return recipe;
// };

// const getDirections = async (path: string): Promise<Directions[]> => {
//   const steps = [];
//   try {
//     const file = await fs.open(path);

//     for await (const line of file.readLines()) {
//       const step = {
//         preNote: '',
//         postNote: '',
//         step: line
//       };

//       steps.push(step);
//     }
//   } catch (err) {
//     console.error(`error: ${err}`);
//   }

//   // console.log({ steps })

//   return [
//     {
//       method: 'oven',
//       methodNote: '',
//       methodSettings: 'stove',
//       steps,
//       serve: 'hot'
//     }
//   ];
// };

// const getIngredients = async (path: string): Promise<Array<Ingredient>> => {
//   const ingredients = [];
//   try {
//     const file = await fs.open(path);

//     for await (const line of file.readLines()) {
//       const amountUS = getQuantity(line);
//       const item = getItem(line);
//       const measurementUS = getMeasurement(line);
//       const ingredient: Ingredient = {
//         item,
//         amountUS,
//         measurementUS,
//         optional: false
//       };

//       ingredients.push(ingredient);
//       // console.log(line);
//     }
//   } catch (err) {
//     console.error(`error: ${err}`);
//   }

//   // console.log({ ingredients })
//   return ingredients;
// };

// const getQuantity = (line: string): number => {
//   const regex = /\b\d+(?:\s\d+\/\d+|\/\d+)?\b/g;
//   const matches = line.match(regex);
//   return matches ? parseFloat(matches[0]) : 0;
// };

// const getItem = (line: string) => {
//   return line.split(' ').splice(2).join(' ');
// };

// const getMeasurement = (line: string): MeasurementUS => {
//   return line.split(' ')[1] as MeasurementUS;
// };

// const updateRecipeJson = async (recipe: Recipe) => {
//   try {
//     // Read from recipes JSON TODO: create json file from typescript file
//     const data = await fs.readFile('../../src/source/json-data/recipes-to-freeze.json', 'utf8') || JSON.stringify([]);
    
//     const dataParsed = JSON.parse(data);

//     // Update json file
//     dataParsed.push(recipe);

//     console.log({ dataParsed });

//     // Write the new file
//     await fs.writeFile('../../src/source/json-data/recipes-to-freeze.json', JSON.stringify(dataParsed));
//   } catch (err) {
//     console.error(`error: ${err}`);
//   }
// };

// newRecipe('Eggplant Veggie Lasagna', 'https://realfoodwholelife.com/wprm_print/black-bean-and-sweet-potato-enchiladas').then((result) => {
//   console.log({
//     ingredients: result.ingredients,
//     directions: result.directions
//   });
//   return updateRecipeJson(result);
// }).then(() => {
//   console.log('success');
// }).catch((err) => {
//   console.error('err');
// });
