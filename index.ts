import express from "express";
import { AppDataSource } from "./app-data-source"
import authRouter from "./routes/authentication"
import coorRouter from "./routes/map"
import dotenv from 'dotenv'; 
import cors from "cors"

dotenv.config();

const app = express();

const corsOption = {
    origin: ['http://localhost:5173'],
};
app.use(cors(corsOption));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

app.use("/auth", authRouter)
app.use("/coordinate", coorRouter)

app.listen("3002", (): void => {
    console.log("Server Running!");
})