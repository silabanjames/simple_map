import { Request, Response } from "express"
import { AppDataSource } from "../app-data-source"
import { User } from "../entities/User";
import { Coordinate } from "../entities/Coordinate";

const userRepository = AppDataSource.getRepository(User)
const coordinateRepository = AppDataSource.getRepository(Coordinate)

const createCoordinate = async (req: Request, res: Response) => {
    try{
        const newCoor = coordinateRepository.create({
            ...req.body
        })
        await coordinateRepository.save(newCoor)

        res.status(200).send({message: "Success to add data!"})
    }
    catch(err){
        console.log(err)
        res.status(400).send({message: err})
    }
}

const getCoordinateList = async (req: Request, res: Response) => {
    try{
        const getCoordinate = await coordinateRepository
                            .createQueryBuilder('coordinate')
                            .select('coor')
                            .from(Coordinate, 'coor')
                            .getMany()
    
        res.status(200).send({data: getCoordinate})
    }
    catch(err){
        console.log(err)
        res.status(400).send({message: err})
    }
}

const getCoordinateDetail = async (req: Request, res: Response) => {
    try{
        const result = await coordinateRepository.findOneBy({id: req.params.id})
        res.status(200).send({data: result})
    }
    catch(err){
        console.log(err)
        res.status(400).send({message: err})
    }
}

const editCoordinate = async (req: Request, res: Response) => {
    try{
        const result = await coordinateRepository.update(
            {id: req.params.id},
            {...req.body}
        )

        if(result.affected == 0){
            res.status(404).send({message: "Coordinate is not found"})
        }
        else{
            res.status(200).send({message: "Success to update coordinate"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({message: err})
    }
}

const deleteCoordinate = async (req: Request, res: Response) => {
    try{
        const result = await coordinateRepository.delete({id: req.params.id})
        if(result.affected == 0){
            res.status(404).send({message: "Coordinate is not found"})
        }
        else{
            res.status(200).send({message: "Success to delete coordinate"})
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send({message: err})
    }
}

export {createCoordinate, getCoordinateList, getCoordinateDetail, editCoordinate, deleteCoordinate}