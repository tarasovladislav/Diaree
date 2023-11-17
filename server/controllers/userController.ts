import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });
//TODO: Move to .env
const SECRET_KEY = process.env.SECRET_KEY!//'Vlad wants to sosi sosi';
console.log(SECRET_KEY);


const postRegister = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password, name } = req.body; //Get credentials from body
        if (!username || !password || !name) return res.status(400).json({ error: "Credentials not provided correctly" });

        const user = await User.find({ username });
        if (user) return res.status(400).json({ error: "Username is already taken" }); //Check if user with username: username already is taken/exists

        const user_id = uuidv4(); //Generate a uuidv4 for the user_id
        await User.insertMany({
            user_id,
            username,
            password: await bcrypt.hash(password, 10), //Use bcrypt to safely store password
            name
        });
        const token = jwt.sign({ user_id }, SECRET_KEY); //Create a JWT from the user_id and secret key
        res.status(201).send(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const postLogin = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body; //Get credentials from body
        if (!username || !password) return res.status(400).json({ error: "Credentials not provided correctly" })

        const user = await User.findOne({ username }); //Check if user exists
        if (!user) return res.status(400).json({ error: "User does not exists" });

        const validPassword = await bcrypt.compare(password, user.password); //Validate password from DB with the one that got provided
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = jwt.sign({ user_id: user.user_id }, SECRET_KEY); //Create a JWT from the user_id and secret key
        res.status(200).send(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { authorization } = req.headers; //Get token (saved as authorization) from headers
        if (!authorization) return res.status(400).json({ error: "Token not provided" });

        const user_id = tokenToUserId(authorization); //Decode the token into a user_id

        const user = await User.findOne({ user_id });
        if (!user) return res.status(400).json({ error: "User does not exists" });

        const { _id, password, __v, ...filteredUser } = user.toObject(); //Filter out unnecessary properties

        res.status(200).json(filteredUser); //Return the filtered user
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

function tokenToUserId(token: string): String {
    const decodedToken = jwt.verify(token, SECRET_KEY) as { user_id: string }; //Verify the token with the secret key
    return decodedToken.user_id; //Return the user_id from the token payload
}


export default {
    postRegister,
    postLogin,
    getUser
}