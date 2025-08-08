import {
  MealCategory,
  Season,
  Region,
  MeasurementEU,
  MeasurementUS,
  PreparationMethod,
  BudgetCategory
} from './enums';

type Variation = {
  serveWith: '' // Could point to another recipe, or just a list of ingredients
}

export type Ingredient = {
  item: string,
  amountUS: number | null,
  measurementUS: MeasurementUS | null,
  amountEU?: number,
  measurementEU?: MeasurementEU
  preparation?: string,
  optional: false | true
}

export type Step = {
  preNote?: string,
  postNote?: string,
  step: string
}

export type Directions = {
  /** Serve step to clarify how to serve the meal */
  serve: string
  steps: Array<Step>,
}

/*
This models needs to be updated to reflect recipes with multiple internal recipes...
Not sure the best way to encapsulate this...
Maybe
Array<ingredients, directions, subrecipe (i.e. topping / filling / other)>

*/
export type Recipe = {
  name: string,
  id: string,
  broadCategory: string,
  /** If there are sub recipes required as part of the larger recipe list those here. The key should be the name of the subrecipe */
  subRecipes: Record<string, SubRecipe>,
  /** 
   * If there are no sub recipes, this will show all steps and ingredients needed for recipe
   * If there are sub recipes, this will detail how the sub recipe fits into the larger recipe
   */
  ingredients: Array<Ingredient>,
  directions: Array<Directions>,
  nutritionNeeds: Array<MealCategory>,
  /** set to true if it is a budget friendly meal */
  budget: boolean,
  /** Season when the dish is best. No season means dish can be made year round */
  season: Array<Season>,
  leftOverNotes?: string,
  notes?: string,
  comments?: Array<string>,
  neighbors?: Array<string>,
  source?: string,
  image: string,
}

export type SubRecipe = {
  ingredients: Array<Ingredient>,
  directions: Array<Directions>,
}

export interface FreshFrozenBaseRecipe extends Recipe {
  // stores the id of the base recipe to look up
  base: string;
}

export interface FreezerRecipe extends Recipe {
  freezer: true,
  howToFreeze: string,
  howToThaw: string
}
