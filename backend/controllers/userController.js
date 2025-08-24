import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email })
        if(!user)  {
            return res.status(401).json({ message: 'Invalid Email or Passowrd' });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)  {
            return res.status(401).json({ message: 'Invalid Email or Passowrd' });
        }

        const token = createToken(user._id)
        res.status(200).json({ message : "Login Successful", token})

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message : error.message})
    }
    // try {
    //     const { email, password } = req.body;

    //     // Check if user exists
    //     const user = await User.findOne({ email });
    //     if (!user) {
    //         return res.status(401).json({ message: 'Invalid email or password' });
    //     }

    //     // Compare password
    //     const isMatch = await bcrypt.compare(password, user.password);
    //     if (!isMatch) {
    //         return res.status(401).json({ message: 'Invalid email or password' });
    //     }

    //     // Generate JWT token
    //     const token = jwt.sign(
    //         { id: user._id, email: user.email },
    //         process.env.JWT_SECRET,
    //         { expiresIn: '1d' }
    //     );

    //     res.status(200).json({
    //         message: 'Login successful',
    //         token,
    //         user: {
    //             id: user._id,
    //             email: user.email,
    //             name: user.name
    //         }
    //     });
    // } catch (error) {
    //     res.status(500).json({ message: 'Server error', error: error.message });
    // }
};

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists'})
        }

        //validation email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Enter Valid Email'})
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Enter Strong Passowrd'})
        }

        //Hasing User Password
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.status(201).json(token)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message : error.message})
        
    }


    //     await newUser.save();

    //     // Generate JWT token
    //     const token = jwt.sign(
    //         { id: newUser._id, email: newUser.email },
    //         process.env.JWT_SECRET,
    //         { expiresIn: '1d' }
    //     );

    //     res.status(201).json({
    //         message: 'User registered successfully',
    //         token,
    //         user: {
    //             id: newUser._id,
    //             email: newUser.email,
    //             name: newUser.name
    //         }
    //     });
    // } catch (error) {
    //     res.status(500).json({ message: 'Server error', error: error.message });
    // }
};

const adminLogin = async (req, res) => {

    try {
        const { email, password} = req.body
        
        if (email === process.env.ADMIN_EMAIL && password ===process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            
            res.status(200).json(token)
        }
        else {
            return res.status(400).json({ message: 'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
    // try {
    //     const { email, password } = req.body;

    //     // Find user by email
    //     const user = await User.findOne({ email });
    //     if (!user || !user.isAdmin) {
    //         return res.status(401).json({ message: 'Unauthorized: Admin access required' });
    //     }

    //     // Compare password
    //     const isMatch = await bcrypt.compare(password, user.password);
    //     if (!isMatch) {
    //         return res.status(401).json({ message: 'Invalid email or password' });
    //     }

    //     // Generate JWT token
    //     const token = jwt.sign(
    //         { id: user._id, email: user.email, isAdmin: true },
    //         process.env.JWT_SECRET,
    //         { expiresIn: '1d' }
    //     );

    //     res.status(200).json({
    //         message: 'Admin login successful',
    //         token,
    //         user: {
    //             id: user._id,
    //             email: user.email,
    //             name: user.name,
    //             isAdmin: user.isAdmin
    //         }
    //     });
    // } catch (error) {
    //     res.status(500).json({ message: 'Server error', error: error.message });
    // }
};

export {
    loginUser,
    registerUser,
    adminLogin
};