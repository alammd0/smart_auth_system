import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message : 'Please provide all the fields'
            })
        }

        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message : 'User already exists'
            })
        }

        const saltRounds = 10 ;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new User(userData);

        await newUser.save();

        return res.status(201).json({
            message : 'User created successfully',
            data : newUser
        })

    }
    catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message : 'Please provide all the fields'
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message : 'User not found'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message : 'Invalid credentials'
            })
        }

        const token = jwt.sign({ _id : user._id }, process.env.JWT_SECRET);

        return res.status(200).json({
            message : 'Login successful',
            token
        })
    }
    catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}