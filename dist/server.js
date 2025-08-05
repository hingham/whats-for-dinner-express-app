"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules
const express_1 = __importDefault(require("express"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const datastoreRoutes_1 = __importDefault(require("./routes/datastoreRoutes"));
const datastoreGetRoutes_1 = __importDefault(require("./routes/datastoreGetRoutes"));
const firebase_1 = __importDefault(require("./config/firebase"));
const projectId = process.env.PROJECT_ID;
console.log({ projectId });
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(body_parser_1.default.json());
/**
 * @description Health check route
 */
app.get('/health', (req, res) => {
    res.status(200).send('Server is running');
});
// Keep these routes commented out until authorization is in place
app.use('/datastore', datastoreGetRoutes_1.default);
app.use(authMiddleware_1.authenticate);
app.use('/datastore', datastoreRoutes_1.default);
/**
 * @description Update user role in the jwt claims for the user
 * User claims will need to be refreshed on the client to show the new claims
 */
app.put('/user/:id/role', (0, authMiddleware_1.authorize)(['admin', 'maintainer', 'subscriber', 'free-tier']), async (req, res) => {
    const userId = req.params.id;
    const newRole = req.body.role;
    console.log({ newRole });
    try {
        await firebase_admin_1.default.auth().setCustomUserClaims(userId, { role: newRole });
        res.status(200).send({ message: 'User role updated successfully' });
    }
    catch (error) {
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
app.get('/recipes', (0, authMiddleware_1.authorize)(['admin', 'maintainer', 'subscriber', 'free-tier']), async (req, res) => {
    try {
        const recipesSnapshot = await firebase_1.default.collection('Recipes').get();
        const recipes = recipesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(recipes);
    }
    catch (error) {
        res.status(500).send('Error fetching recipes');
    }
});
/**
 * @description Create new recipes for maintainers only
  
 */
app.post('/recipes', (0, authMiddleware_1.authorize)(['admin', 'maintainer']), async (req, res) => {
    try {
        const newRecipe = req.body;
        const recipeRef = await firebase_1.default.collection('Recipes').add(newRecipe);
        res.status(201).json({ id: recipeRef.id, ...newRecipe });
    }
    catch (error) {
        res.status(500).send('Error creating recipe');
    }
});
/**
 * @description Update existing recipes for maintainers only
 */
app.put('/recipes/:id', (0, authMiddleware_1.authorize)(['admin', 'maintainer']), async (req, res) => {
    try {
        const recipeId = req.params.id;
        const updatedRecipe = req.body;
        await firebase_1.default.collection('Recipes').doc(recipeId).update(updatedRecipe);
        res.status(200).send('Recipe updated successfully');
    }
    catch (error) {
        res.status(500).send('Error updating recipe');
    }
});
/**
 * @description Delete recipes for maintainers only
 */
app.delete('/recipes/:id', (0, authMiddleware_1.authorize)(['admin', 'maintainer']), async (req, res) => {
    try {
        const recipeId = req.params.id;
        await firebase_1.default.collection('Recipes').doc(recipeId).delete();
        res.status(200).send('Recipe deleted successfully');
    }
    catch (error) {
        res.status(500).send('Error deleting recipe');
    }
});
// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
