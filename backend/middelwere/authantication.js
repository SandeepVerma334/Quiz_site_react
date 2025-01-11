import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function authenticateUser(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Token Authorization header se extract karein

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Check if token matches the current_token in the database
        const user = await prisma.users.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.current_token !== token) {
            return res.status(401).json({ message: 'Session invalid. Please log in again.' });
        }

        req.user = user; // Attach user info to the request
        next();
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
}
