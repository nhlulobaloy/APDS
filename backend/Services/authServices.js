import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//password hashing using bcrypt 
export const hashPassword = async (password) => {
const hashedPassword = await bcrypt.hash(password, 10);
return hashedPassword;
} 
//generates the token
export const generateToken = async (userId) => {
    const token = jwt.sign({  userId }, process.env.SECRET_KEY, {expiresIn: "5h"});
    return token;
}
//verify the user password
export const verifyPassword = async (userPassword, dbPassword) => {
    const isValid = await bcrypt.compare(userPassword, dbPassword);
    return isValid;
}
