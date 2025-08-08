import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import { CustomRequest } from '../models/customRequest';
;
// Middleware to verify Firebase ID token
export const authenticate = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  try {
    if (!token) {
      throw new Error('no token found');
    }

    console.log("test")
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.claims = decodedToken;
    console.log(decodedToken, "test")

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).send('Unauthorized');
  }
};


// Middleware for role-based access control
export const authorize = (roles: string[]) => (req: CustomRequest, res: Response, next: NextFunction): void => {
  const role = req?.claims?.role || ''
  if (!roles.includes(role)) {
    res.status(403).send('Forbidden');
    return;
  }
  next();
};