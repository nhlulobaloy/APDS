import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

<<<<<<< HEAD

//password hashing using bcrypt 
=======
>>>>>>> person3-security
export const hashPassword = async (password) => {
const hashedPassword = await bcrypt.hash(password, 10);
return hashedPassword;
} 
<<<<<<< HEAD
//generates the token
=======

>>>>>>> person3-security
export const generateToken = async (userId) => {
    const token = jwt.sign({  userId }, process.env.SECRET_KEY, {expiresIn: "5h"});
    return token;
}
<<<<<<< HEAD
//verify the user password
=======

>>>>>>> person3-security
export const verifyPassword = async (userPassword, dbPassword) => {
    const isValid = await bcrypt.compare(userPassword, dbPassword);
    return isValid;
}
