import jwt from 'jsonwebtoken';
import { jwt_Secret } from '../config/config.js';

export const authenticate =  (req, res, next) =>{

    const token = req.cookies.token
    if(!token){
        return res.status(403).send({ message: "Access denied. please login." });
    }

    try {
        const decoded= jwt.verify(token, jwt_Secret)
         req.user = decoded;
        next()
    } catch (error) {
        console.log(error.message)
        
    }
   

}