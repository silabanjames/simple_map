import express from "express";
import { 
    createCoordinate, 
    getCoordinateList, 
    getCoordinateDetail, 
    editCoordinate, 
    deleteCoordinate 
} from "../controllers/map"
import {
    verifyUserToken,
    IsAdmin,
} from "../middlewares/authentication"

const router = express.Router()

router.get('/', verifyUserToken, IsAdmin, getCoordinateList)

router.post('/', verifyUserToken, createCoordinate)

router.get("/:id", verifyUserToken, getCoordinateDetail)

router.put('/:id', verifyUserToken, editCoordinate)

router.delete("/:id", verifyUserToken, IsAdmin, deleteCoordinate)

// module.exports = router
export default router