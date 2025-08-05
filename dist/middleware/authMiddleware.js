"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
;
// Middleware to verify Firebase ID token
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    try {
        if (!token) {
            throw new Error('no token found');
        }
        console.log("test");
        const decodedToken = await firebase_admin_1.default.auth().verifyIdToken(token);
        req.claims = decodedToken;
        console.log(decodedToken, "test");
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(401).send('Unauthorized');
    }
};
exports.authenticate = authenticate;
// Middleware for role-based access control
const authorize = (roles) => (req, res, next) => {
    const role = req?.claims?.role || '';
    if (!roles.includes(role)) {
        res.status(403).send('Forbidden');
        return;
    }
    next();
};
exports.authorize = authorize;
