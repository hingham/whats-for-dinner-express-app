// Import required modules
import express, { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { authenticate, authorize } from "./middleware/authMiddleware"
import datastoreRoutes from "./routes/datastoreRoutes"
import datastoreGetRoutes from "./routes/datastoreGetRoutes"
import db from "./config/firebase"
const projectId = process.env.PROJECT_ID;
console.log({ projectId });

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

/**
 * @description Health check route
 */
app.get('/health', (req, res: Response) => {
    res.status(200).send('Server is running');
});


// Keep these routes commented out until authorization is in place
app.use('/datastore', datastoreGetRoutes)

app.use(authenticate)
app.use('/datastore', datastoreRoutes);

/**
 * @description Update user role in the jwt claims for the user
 * User claims will need to be refreshed on the client to show the new claims
 */
app.put('/user/:id/role', authorize(['admin', 'maintainer', 'subscriber', 'free-tier']), async (req, res) => {
    const userId = req.params.id;
    const newRole = req.body.role;
    console.log({ newRole })

    try {
        await admin.auth().setCustomUserClaims(userId, { role: newRole });
        res.status(200).send({ message: 'User role updated successfully' });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).send('Error updating user role');
    }
});

/**
 * @description Get list of recipes for user
 * TODO: need to determine how to return recipes without returning ALL the recipes...
 * Would be nice to return max of 50 recipes - filtering / prioritizing season and diet
 * Aiming for 50mb max for cache results
 * May be possible to avoid caching images strategically and only fetch as needed / when available
 *
*/
app.get('/recipes', authorize(['admin', 'maintainer', 'subscriber', 'free-tier']), async (req, res) => {
    try {
        const recipesSnapshot = await db.collection('Recipes').get();
        const recipes = recipesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).send('Error fetching recipes');
    }
});

/**
 * @description Create new recipes for maintainers only
  
 */
app.post('/recipes', authorize(['admin', 'maintainer']), async (req, res) => {
    try {
        const newRecipe = req.body;
        const recipeRef = await db.collection('Recipes').add(newRecipe);
        res.status(201).json({ id: recipeRef.id, ...newRecipe });
    } catch (error) {
        res.status(500).send('Error creating recipe');
    }
});

/**
 * @description Update existing recipes for maintainers only
 */
app.put('/recipes/:id', authorize(['admin', 'maintainer']), async (req, res) => {
    try {
        const recipeId = req.params.id;
        const updatedRecipe = req.body;
        await db.collection('Recipes').doc(recipeId).update(updatedRecipe);
        res.status(200).send('Recipe updated successfully');
    } catch (error) {
        res.status(500).send('Error updating recipe');
    }
});

/**
 * @description Delete recipes for maintainers only
 */
app.delete('/recipes/:id', authorize(['admin', 'maintainer']), async (req, res) => {
    try {
        const recipeId = req.params.id;
        await db.collection('Recipes').doc(recipeId).delete();
        res.status(200).send('Recipe deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting recipe');
    }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});