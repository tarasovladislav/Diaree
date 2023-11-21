import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { Request, response, Response } from 'express';
import { validateUser } from '../utils/userUtils.js';

import path from 'path'
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const SECRET_KEY = process.env.SECRET_KEY!;
const postRegister = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body; //Get credentials from body
        if (!username || !password) return res.status(400).json({ error: "Credentials not provided correctly" });

        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ error: "Username is already taken" }); //Check if user with username: username already is taken/exists

        const user_id = uuidv4(); //Generate a uuidv4 for the user_id
        await User.insertMany({
            user_id,
            username,
            password: await bcrypt.hash(password, 10) //Use bcrypt to safely store password
        });
        const token = jwt.sign({ user_id }, SECRET_KEY); //Create a JWT from the user_id and secret key
        res.status(201).json({ token });
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const postLogin = async (req: Request, res: Response): Promise<any> => {
    // const SECRET_KEY = process.env.SECRET_KEY!;

    try {
        const { username, password } = req.body; //Get credentials from body
        if (!username || !password) return res.status(400).json({ error: "Credentials not provided correctly" })

        const user = await User.findOne({ username }); //Check if user exists
        if (!user) return res.status(400).json({ error: "User does not exists" });

        const validPassword = await bcrypt.compare(password, user.password); //Validate password from DB with the one that got provided
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = jwt.sign({ user_id: user.user_id }, SECRET_KEY); //Create a JWT from the user_id and secret key
        res.status(200).json({ token });
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const validatedUser = await validateUser(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user) return res.status(401).json({ error: validatedUser });

        const { user } = validatedUser;

        const { _id, password, __v, ...filteredUser } = user.toObject(); // Filter out unnecessary properties

        res.status(200).json(filteredUser); // Return the filtered user
    } catch (error) {
        console.error("Error in getUser:", error);
        res.status(500).json({ error: "Internal server error in getUser" });
    }
};


const putUpdate = async (req: Request, res: Response): Promise<any> => { //TODO: fix
    try {
        const { username, password } = req.body;
        const validatedUser = await validateUser(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user) return res.status(401).json({ error: validatedUser });
        const { user_id, user } = validatedUser;
        const updatedUsername = username || user.username;
        const updatedPassword = password ? await bcrypt.hash(password, 10) : user.password;

        await User.updateOne(
            { user_id },
            {
                $set: {
                    username: updatedUsername,
                    password: updatedPassword
                }
            },
            // { returnDocument: 'after' } //Testing purposes only (returns updated version) needs findOneAndUpdate
        );

        res.status(200).json({ status: 200, message: "Successfully changed credentials"  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getValidateToken = async (req: Request, res: Response): Promise<any> => {
    try {
        const validatedUser = await validateUser(req, res);
        if (!validatedUser || !validatedUser.user_id || !validatedUser.user) res.status(401).json({ status: 401, error: validatedUser })
        else {
            res.status(200).json({ message: "Valid token" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export default {
    postRegister,
    postLogin,
    getUser,
    putUpdate,
    getValidateToken
}