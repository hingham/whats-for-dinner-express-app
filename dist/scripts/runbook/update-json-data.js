"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs/promises');
const uuid_1 = require("uuid");
const fileToRead = '../../../json-data/recipes-fresh-frozen-base.json';
const fileToWrite = '../../../json-data/recipes-fresh-frozen-base.json';
const updateRecipeJson = async () => {
    try {
        // Read from recipes JSON TODO: create json file from typescript file
        const data = await fs.readFile('../src/source/json-data/recipes-to-freeze.json', 'utf8') || JSON.stringify([]);
        // Parse the JSON data
        const recipes = JSON.parse(data);
        // Add 'image' property to each element
        const updatedRecipes = recipes.map(recipe => {
            // eslint-disable-next-line no-param-reassign
            recipe.id = (0, uuid_1.v4)();
            return recipe;
        });
        // Write the new file
        await fs.writeFile('../src/source/json-data/recipes-to-freeze.json', JSON.stringify(updatedRecipes));
    }
    catch (err) {
        console.error(`error: ${err}`);
    }
};
const updateRecipeSubrecipe = async () => {
    try {
        // Read from recipes JSON TODO: create json file from typescript file
        const data = await fs.readFile(fileToWrite, 'utf8') || JSON.stringify([]);
        // Parse the JSON data
        const recipes = JSON.parse(data);
        const updatedRecipes = recipes.map(recipe => {
            // eslint-disable-next-line no-param-reassign
            recipe.subRecipes = {};
            return recipe;
        });
        // Write the new file
        await fs.writeFile(fileToWrite, JSON.stringify(updatedRecipes));
    }
    catch (err) {
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
