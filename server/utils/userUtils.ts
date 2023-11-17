import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });
const SECRET_KEY = process.env.SECRET_KEY!;

export async function validateUser(req: Request, res: Response): Promise<{ user_id: string; user: any } | undefined> {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({ error: "No token provided" });
            return undefined;
        }
        const user_id = tokenToUserId(authorization);
        if (!user_id) {
            res.status(401).json({ error: "Could not verify signature" });
            return undefined;
        }
        const user = await User.findOne({ user_id });
        if (!user) {
            res.status(404).json({ error: "User does not exist" });
            return undefined;
        }
        return { user_id, user };
    } catch (error) {
        throw error;
    }
}


export function tokenToUserId(token: string) {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY) as { user_id: string }; //Verify the token with the secret key
        return decodedToken.user_id; //Return the user_id from the token payload
    } catch (error) {
        console.error(error);
        return undefined;
    }
}