import express, { Request } from 'express';

// Extend Express Request type to include `user` property
export interface CustomRequest extends Request {
    claims?: {
        uid: string;
        role?: string;
        [key: string]: any; // Allow additional properties
    };
    headers: {
        authorization?: string;
        [key: string]: any; // Allow other headers
    };
}

