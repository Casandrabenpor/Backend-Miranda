"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Cargar variables de entorno desde el archivo .env
let dbConnection = null;
const uri = 'mongodb+srv://casandra:' +
    process.env.DB_PASSWORD +
    '@miranda.rstgdgt.mongodb.net/hotelmiranda?retryWrites=true&w=majority';
async function connectToDb() {
    try {
        if (dbConnection == null) {
            dbConnection = await mongoose_1.default.connect(uri, {
                // useUnifiedTopology: true,
                // useNewUrlParser: true,
                maxIdleTimeMS: 270000,
                minPoolSize: 2,
                maxPoolSize: 4,
            });
            console.log('Conexión exitosa a la base de datos');
        }
        return dbConnection;
    }
    catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}
exports.connectToDb = connectToDb;
