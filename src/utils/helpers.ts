import schema from "./recipe-json-schema.json"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getOpenAPIResponse = async (requestBody: any) => {
  // const model = 'gpt-4.1-nano-2025-04-14'; // Replace with your fine-tuned model name
  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });
    // const response = await
    return response.json();
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const getOpenAPIFormattedResponse = async (recipeText: string) => {
  // Model isn't returning false when recipe is not a recipe. No input prompts model to create a original recipe.
  const systemContent = 'You are a recipe parser who takes unstructured recipes, and returns structured JSON format with refined directions and consistently parsed ingredients. If input is not recipe, return "false"';
  const requestBody = {
    model: 'gpt-4o-mini',
    input: [
      { role: 'system', content: systemContent },
      { role: 'user', content: recipeText },
    ],
    text: {
      // Need to create json schema for this
      format: {
        type: 'json_schema',
        name: 'RecipeParsing',
        schema,
        strict: true,
      },
    },
  };

  return getOpenAPIResponse(requestBody);
};

const getOpenAPIRefinedResponse = async (recipeText: string) => {
  const systemContent = 'You are recipe refiner. Edit this recipe to be clear, concise and easy to follow:';
  const requestBody = {
    model: 'gpt-4o-mini', // what happens when we sub this in...
     input: [
      { role: 'system', content: systemContent },
      { role: 'user', content: recipeText },
    ],
    text: {
        verbosity: 'medium',
    }
  };

  return getOpenAPIResponse(requestBody);
};

export { getOpenAPIFormattedResponse, getOpenAPIRefinedResponse };