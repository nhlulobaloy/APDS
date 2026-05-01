import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next(); 
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}