import { FreshFrozenBaseRecipe, Ingredient, Directions, SubRecipe } from "../models/recipe";

export function validateFreshFrozenBaseRecipe(input: FreshFrozenBaseRecipe): boolean {
  // Helper function to validate Ingredient
  const isValidIngredient = (ingredient: any): boolean => {
    const validationRules = [
      { 
        key: "item", 
        condition: typeof ingredient.item === "string", 
        error: "Invalid item: must be a string." 
      },
      { 
        key: "amountUS", 
        condition: typeof ingredient.amountUS === "number" || ingredient.amountUS === null, 
        error: "Invalid amountUS: must be a number or null." 
      },
      { 
        key: "measurementUS", 
        condition: typeof ingredient.measurementUS === "string" || ingredient.measurementUS === null, 
        error: "Invalid measurementUS: must be a string or null." 
      },
      { 
        key: "amountEU", 
        condition: ingredient.amountEU === undefined || typeof ingredient.amountEU === "number", 
        error: "Invalid amountEU: must be undefined or a number." 
      },
      { 
        key: "measurementEU", 
        condition: ingredient.measurementEU === undefined || typeof ingredient.measurementEU === "object", 
        error: "Invalid measurementEU: must be undefined or an object." 
      },
      { 
        key: "preparation", 
        condition: ingredient.preparation === undefined || typeof ingredient.preparation === "string", 
        error: "Invalid preparation: must be undefined or a string." 
      },
      { 
        key: "optional", 
        condition: typeof ingredient.optional === "boolean", 
        error: "Invalid optional: must be a boolean." 
      },
    ];
  
    let isValid = true;
  
    for (const { key, condition, error } of validationRules) {
      if (!condition) {
        console.error(`Validation failed for ingredient field "${key}": ${error}`);
        isValid = false;
      }
    }
  
    return isValid;
  };

  // Helper function to validate Step
  const isValidStep = (step: any): boolean => {
    return (
      (step.preNote === undefined || typeof step.preNote === "string") &&
      (step.postNote === undefined || typeof step.postNote === "string") &&
      typeof step.step === "string"
    );
  };

  // Helper function to validate Directions
  const isValidDirections = (directions: any): boolean => {
    return (
      typeof directions.serve === "string" &&
      Array.isArray(directions.steps) &&
      directions.steps.every(isValidStep)
    );
  };

  // Helper function to validate SubRecipe
  const isValidSubRecipe = (subRecipe: any): boolean => {
    return (
      Array.isArray(subRecipe.ingredients) &&
      subRecipe.ingredients.every(isValidIngredient) &&
      Array.isArray(subRecipe.directions) &&
      subRecipe.directions.every(isValidDirections)
    );
  };

  // Validate FreshFrozenBaseRecipe using a switch structure
  const keysToValidate = [
    { key: "name", condition: typeof input.name === "string", error: "Invalid name: must be a string." },
    { key: "id", condition: typeof input.id === "string", error: "Invalid id: must be a string." },
    { key: "broadCategory", condition: typeof input.broadCategory === "string", error: "Invalid broadCategory: must be a string." },
    { key: "base", condition: typeof input.base === "string", error: "Invalid base: must be a string." },
    { key: "budget", condition: typeof input.budget === "boolean", error: "Invalid budget: must be a boolean." },
    { key: "ingredients", condition: Array.isArray(input.ingredients) && input.ingredients.every(isValidIngredient), error: "Invalid ingredients: must be an array of valid Ingredient objects." },
    { key: "directions", condition: Array.isArray(input.directions) && input.directions.every(isValidDirections), error: "Invalid directions: must be an array of valid Directions objects." },
    { key: "nutritionNeeds", condition: Array.isArray(input.nutritionNeeds), error: "Invalid nutritionNeeds: must be an array." },
    { key: "season", condition: Array.isArray(input.season), error: "Invalid season: must be an array." },
    { key: "leftOverNotes", condition: input.leftOverNotes === undefined || typeof input.leftOverNotes === "string", error: "Invalid leftOverNotes: must be undefined or a string." },
    { key: "notes", condition: input.notes === undefined || typeof input.notes === "string", error: "Invalid notes: must be undefined or a string." },
    { key: "comments", condition: input.comments === undefined || (Array.isArray(input.comments) && input.comments.every(comment => typeof comment === "string")), error: "Invalid comments: must be undefined or an array of strings." },
    { key: "neighbors", condition: input.neighbors === undefined || (Array.isArray(input.neighbors) && input.neighbors.every(neighbor => typeof neighbor === "string")), error: "Invalid neighbors: must be undefined or an array of strings." },
    { key: "source", condition: input.source === undefined || typeof input.source === "string", error: "Invalid source: must be undefined or a string." },
    { key: "image", condition: typeof input.image === "string", error: "Invalid image: must be a string." },
    { key: "subRecipes", condition: typeof input.subRecipes === "object" && Object.values(input.subRecipes).every(isValidSubRecipe), error: "Invalid subRecipes: must be an object with valid SubRecipe values." },
  ];

  for (const { key, condition, error } of keysToValidate) {
    if (!condition) {
      console.error(`Validation failed for key "${key}": ${error}`);
      return false;
    }
  }

  return true;
}

export const getExcessKeys = (input: FreshFrozenBaseRecipe): string[] => {
  const extraKeys: string[] = [];
  const validKeys: { [key: string]: string } = {
    name: "name",
    id: "id",
    broadCategory: "broadCategory",
    base: "base",
    budget: "budget",
    ingredients: "ingredients",
    directions: "directions",
    nutritionNeeds: "nutritionNeeds",
    season: "season",
    leftOverNotes: "leftOverNotes",
    notes: "notes",
    comments: "comments",
    neighbors: "neighbors",
    source: "source",
    image: "image",
    subRecipes: "subRecipes"
  }

  Object.keys(input).forEach(key => {
    if (!validKeys[key]) {
      console.warn(`Excess key found: ${key}`);
    }
  })

  return extraKeys;
}

