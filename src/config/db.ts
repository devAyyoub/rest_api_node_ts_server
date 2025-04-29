import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import path from 'path';
import Product from '../models/Product.model';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
    models: [path.join(__dirname, '../models/**/*.ts')],
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

db.addModels([Product]);

export default db;