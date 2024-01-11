import jwt from "jsonwebtoken"
import { Request, Response } from "express"

declare global {
    namespace Express {
      interface Request {
        user?: any
      }
    }
  }

// Must be verified user
const verifyUserToken = (req: Request, res: Response, next: any) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send({message: "Unauthorized request"});

    try {
        token = token.split(' ')[1] // Remove Bearer from string

        if (token === 'null' || !token) return res.status(401).send({message: 'Unauthorized request'});

        let verifiedUser = jwt.verify(token, process.env.JWT_SECRET!); 
        if (!verifiedUser) return res.status(401).send({message: 'Unauthorized request'})

        req.user = verifiedUser; // user_id & user_type_id
        next();

    } catch (error) {
        res.status(400).send({message: "Invalid Token"});
    }

}

// Middleware for admine
const IsAdmin = async (req: Request, res: Response, next: any) => {
    if (req.user.role === true) {
        next();
    }
    else{
        return res.status(401).send({message: "You Are Not Admin!"});
    }

}

export {verifyUserToken, IsAdmin}