import express from 'express';
import { getOpenAPIFormattedResponse, getOpenAPIRefinedResponse } from '../utils/helpers'
const router = express.Router();

// Example route to add a new document
router.post('/raw-recipe', async (req, res) => {
    const data = req.body;

    console.log({ data })
    try {

        const openAPIRefinedResponse = await getOpenAPIRefinedResponse(data.rawRecipe);
        const refinedText = openAPIRefinedResponse?.output[0]?.content[0]?.text;
        console.log('Refined Directions:', openAPIRefinedResponse, refinedText);

        if (refinedText == "false") {
            console.log("not a recipe");
            res.status(201).json({status: false});
        }
        const openAIResponse = await getOpenAPIFormattedResponse(refinedText || data.rawRecipe);
        const refinedJsonRecipe = openAIResponse?.output[0]?.content[0]?.text;
        console.log('OpenAI Formatted Response:', refinedJsonRecipe, openAIResponse);


        res.status(201).json(refinedJsonRecipe);
    } catch (error) {
        console.error({ error })
        res.status(500).json({ error: (error as Error)?.message });
    }
});

export default router
