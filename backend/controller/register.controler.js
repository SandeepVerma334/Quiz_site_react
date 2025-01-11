import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function createUser(req, res) {
    try {
        const { first_name, middle_name, last_name, email, password, tags, role, gender, description } = req.body;

        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with hashed password
        const user = await prisma.users.create({
            data: {
                first_name,
                middle_name,
                last_name,
                email,
                password: hashedPassword,
                tags,
                role,
                gender,
                description,
            },
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        // const TokenUpdate = await prisma.users.update({
        //     where: { id: user.id },
        //     data: { current_token: token },
        // }); 
        return res.status(201).json({
            message: "User created successfully",
            user: { id: user.id, first_name: user.first_name, email: user.email },
            token: token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Login Function
export async function userLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await prisma.users.findFirst({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Check if user is already logged in with a valid token
        if (user.current_token) {
            try {
                jwt.verify(user.current_token, process.env.JWT_SECRET_KEY);
                return res.status(403).json({ message: 'Already logged in from another device.' });
            } catch (err) {
                // Token expired or invalid, proceed with login
            }
        }

        // Generate new token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '5h' }
        );

        // Update the current_token in the database
        await prisma.users.update({
            where: { id: user.id },
            data: { current_token: token },
        });

        return res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, first_name: user.first_name, email: user.email },
            token: token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// Logout Function
export async function userLogout(req, res) {
    const { id } = req.user; // Middleware se user info milti hai

    try {
        await prisma.users.update({
            where: { id },
            data: { current_token: null }, // Token ko invalidate karen
        });

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export async function getAllUsers(req, res) {
    try {
        const users = await prisma.users.findMany();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}