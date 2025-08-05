// /* Description:
// Reads in ingredients and instructions

// Creates json typed recipe and updates the json file which stores all frozen recipes
// */

// const recipeName = 'Spaghetti and Veggie Turkey Meatballs';
// const recipeSource = '';
// const recipeBase = '9f9e4a9c-f3e2-4b8c-baad-a3d695195c2b';

// const file = '../../src/source/json-data/recipes-fresh-frozen-base.json';
// const ingredientsFile = 'ingredients.txt';
// const directionsFile = 'instructions.txt';

// import { BudgetCategory, MeasurementUS } from 'models/enums';
// import {
//   Directions, FreezerRecipe, Ingredient, Recipe, FrozenBaseRecipe, Step
// } from 'models/recipe';
// import { v4 as uuidv4 } from 'uuid';

// // import * as fs from 'fs/promises'
// const fs = require('fs/promises');

// const getQuantity = (line: string): number | null => {
//   const regex = /\b\d+(?:\s\d+\/\d+|\/\d+)?\b/g;
//   const matches = line.match(regex);
//   const match = matches ? matches[0] : null;
//   return match ? convertToDecimal(match) : null;
// };

// // TODO: update this to more reliably find the item
// const getItem = (line: string, quantity: string | null = null) => {
//   const lineArr = line.split(' ');
//   const startValue: string[] = [];

//   const itemStringList = lineArr.reduce((acc, curr) => {
//     if (curr === quantity || curr.match(/\b\d+\b/g)) {
//       return acc;
//     }
//     acc.push(curr);
//     return acc;
//   }, startValue);

//   return itemStringList.join(' ');
// };

// const getMeasurement = (line: string): MeasurementUS => {
//   const regex = /\b(?:tbsp|tsp|oz|g|kg|mg|lb|lbs|cup|cups|ml|l|liters|teaspoon|teaspoons|tablespoon|tablespoons|ounce|ounces|gram|grams|kilogram|kilograms|pound|pounds)\b/gi;
//   const matches = line.match(regex) as MeasurementUS[];
//   return matches ? matches[0] : null;
// };

// const getDirections = async (): Promise<Directions[]> => {
//   const steps: Step[] = [];
//   let lines: string[] = [];
//   try {
//     const data = await fs.readFile(directionsFile, 'utf-8');
//     lines = data.split('\n');
//   } catch (err) {
//     console.error(`error: ${err}`);
//   }

//   lines.forEach((line: string) => {
//     const step = {
//       preNote: '',
//       postNote: '',
//       step: line
//     };

//     steps.push(step);
//   });

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

// const getIngredients = async (): Promise<Array<Ingredient>> => {
//   const ingredients: Ingredient[] = [];
//   let lines: string[] = [];
//   const optionalMatch = /\boptional\b/i;

//   try {
//     const data = await fs.readFile(ingredientsFile, 'utf-8');
//     lines = data.split('\n');
//   } catch (err) {
//     console.error(`error: ${err}`);
//   }

//   lines.forEach((line: string) => {
//     const amountUS = getQuantity(line);
//     const measurementUS = getMeasurement(line);
//     const item = getItem(line, measurementUS);
//     const isOptional = optionalMatch.test(line);
//     const ingredient: Ingredient = {
//       item,
//       amountUS,
//       measurementUS,
//       optional: isOptional
//     };

//     ingredients.push(ingredient);
//   });
//   return ingredients;
// };

// function convertToDecimal(input: string): number {
//   // Trim any extra spaces
//   input = input.trim();

//   // Split the input into whole number and fraction parts
//   const parts = input.split(' ');

//   let decimal = 0;

//   if (parts.length === 2) {
//     // If input contains both whole number and fraction
//     const wholeNumber = parseFloat(parts[0]);
//     const [numerator, denominator] = parts[1].split('/').map(Number);
//     decimal = wholeNumber + numerator / denominator;
//   } else if (parts.length === 1) {
//     // If input contains only a fraction or a whole number
//     if (input.includes('/')) {
//       const [numerator, denominator] = input.split('/').map(Number);
//       decimal = numerator / denominator;
//     } else {
//       decimal = parseFloat(input);
//     }
//   }
//   return parseFloat(decimal.toFixed(2));
// }

// const updateRecipeJson = async (recipe: Recipe) => {
//   try {
//     // Read from recipes JSON TODO: create json file from typescript file
//     const data = await fs.readFile(file, 'utf8') || JSON.stringify([]);
//     const dataParsed = JSON.parse(data);

//     // Update json file
//     dataParsed.push(recipe);

//     console.log({ dataParsed });

//     // Write the new file
//     await fs.writeFile(file, JSON.stringify(dataParsed));
//   } catch (err) {
//     console.error(`error: ${err}`);
//   }
// };

// const newRecipe = async (name: string, source: string, base: string): Promise<FrozenBaseRecipe> => {
//   const ingredients = await getIngredients();

//   const directions = await getDirections();

//   const recipe: FrozenBaseRecipe = {
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
//     image: '',
//     base
//   };

//   return recipe;
// };

// newRecipe(recipeName, recipeSource, recipeBase).then((result) => {
//   console.log({
//     ingredients: result.ingredients,
//     directions: result.directions
//   });
//   return updateRecipeJson(result);
// }).then(() => {
//   console.log('success');
// }).catch((err) => {
//   console.error({ err });
// });

// // const q = getItem('Salt to taste', null);
// // console.log({q})