import { Request, Response } from "express"
// import { plainToInstance } from 'class-transformer';
// import { RegisterDto } from '../dtos/Register.dto';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppDataSource } from "../app-data-source"
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User)

const register = async (req: Request, res: Response) => {
    try{
        const email = req.body.email
        const result = await userRepository.findOneBy({email})

        if(result){
            res.status(400).send({message: "Email have been used"})
        }
        else{
            // const userDTO = plainToInstance(RegisterDto, req.body. { excludeExtraneousValues: true });
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
        
            userRepository.insert({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
                role: Boolean(req.body.role)
            }) 

            // const newUser = userRepository.create()

            // newUser.name = req.body.name
            // newUser.email = req.body.email
            // newUser.password = hashPassword
            // newUser.role = Booleanreq.body.role)
            // await userRepository.save(newUser);
        
            res.status(200).send({message: "Success to add data!"})
        }

    }
    catch(err){
        res.status(400).send({message: "Bad Request"})
    }

}

const login = async (req: Request, res: Response) => {
    const searchUser = await userRepository.findOneBy({email: req.body.email})
    if(!searchUser){
        res.status(400).send({message: "Email or Password is wrong"})
    }
    else{
        const validPass = await bcrypt.compare(req.body.password, searchUser.password);
        if (!validPass) return res.status(400).send({message: "Email or Password is wrong"});
        // Create and assign token
        let payload = { id: searchUser.id, role: searchUser.role };
        const secret = process.env.JWT_SECRET!
        const expiresIn = 60 * 60 * 1
        const token = jwt.sign(payload, secret, {expiresIn});
        res.status(200).send({ 
            access_token: token, 
            user_information: {
                id: searchUser.id,
                name: searchUser.name,
                email: searchUser.email,
                role: searchUser.role
            }
        })
    }
}

export {register, login}