import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from "./models/documents.model";
import { User } from "./models/users.model";
import { Role } from "./models/role.model";
import { config } from "dotenv";
import { DynamicModule } from '@nestjs/common';
export function Database(): DynamicModule {
    config();

    return SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.PGSQL_HOST,
        port: parseInt(process.env.PGSQL_PORT),
        username: process.env.PGSQL_USERNAME,
        password: process.env.PGSQL_PASSWORD,
        database: process.env.PGSQL_DATABASE,
        models: [User, Role, Document],
        autoLoadModels: true,  // Automatically load models for simplicity
        synchronize: false,
    });
}

// export models
export { Role } from "./models/role.model";
export { User } from "./models/users.model";
export { Document } from "./models/documents.model";