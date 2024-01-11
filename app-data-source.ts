import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin1234",
    database: "simple_map",
    entities: ["./entities/*.ts"],
    synchronize: true
})