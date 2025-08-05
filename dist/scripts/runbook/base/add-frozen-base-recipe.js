"use strict";
// /* Description:
// Reads in ingredients and instructions
// Creates json typed recipe and updates the json file which stores all frozen recipes
// */
// const recipeName = 'Vegetable Turkey Mix';
// const recipeSource = '';
// const directionsFile = 'instructions.txt';
// const jsonPath = '../../src/source/json-data/freezer-base-recipes.json';
// import { BudgetCategory, MeasurementUS } from '../../../models/enums';
// import {
//   Directions, FreezerRecipe, Ingredient, Recipe, Step
// } from '../../../models/recipe';
// import { v4 as uuidv4 } from 'uuid';
// // import * as fs from 'fs/promises'
// const fs = require('fs/promises');
// const getDirections = async (path: string): Promise<Directions[]> => {
//   const steps: Step[] = [];
//   let lines = [];
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
// const getQuantity = (line: string): number | null => {
//   const regex = /\b\d+(?:\s\d+\/\d+|\/\d+)?\b/g;
//   const matches = line.match(regex);
//   const match = matches ? matches[0] : null;
//   return match ? convertToDecimal(match) : null;
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
// const getItem = (line: string) => {
//   return line.split(' ').splice(2).join(' ');
// };
// const getMeasurement = (line: string): MeasurementUS => {
//   return line.split(' ')[1] as MeasurementUS;
// };
// const updateRecipeJson = async (recipe: Recipe) => {
//   try {
//     // Read from recipes JSON TODO: create json file from typescript file
//     const data = await fs.readFile(jsonPath, 'utf8') || JSON.stringify([]);
//     const dataParsed = JSON.parse(data);
//     // Update json file
//     dataParsed.push(recipe);
//     console.log({ dataParsed });
//     // Write the new file
//     await fs.writeFile(jsonPath, JSON.stringify(dataParsed));
//   } catch (err) {
//     console.error(`error: ${err}`);
//   }
// };
// const newRecipe = async (name: string, source: string): Promise<FreezerRecipe> => {
//   const ingredients = await getIngredients('ingredients.txt');
//   const directions = await getDirections('instructions.txt');
//   const recipe: FreezerRecipe = {
//     ingredients,
//     directions,
//     name,
//     freezer: true,
//     id: uuidv4(),
//     broadCategory: '',
//     nutritionNeeds: [],
//     season: ['fall', 'winter'],
//     leftOverNotes: '',
//     notes: '',
//     comments: [],
//     neighbors: [],
//     source,
//     image: ''
//   };
//   return recipe;
// };
// newRecipe(recipeName, recipeSource).then((result) => {
//   console.log({
//     ingredients: result.ingredients,
//     directions: result.directions
//   });
//   return updateRecipeJson(result);
// }).then(() => {
//   console.log('success');
// }).catch((err) => {
//   console.error('err', err);
// });
