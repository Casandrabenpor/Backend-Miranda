import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

let dbConnection: any = null;

const uri =
  'mongodb+srv://casandra:' +
  process.env.DB_PASSWORD +
  '@miranda.rstgdgt.mongodb.net/hotelmiranda?retryWrites=true&w=majority';

export async function connectToDb() {
  try {
    if (dbConnection == null) {
      dbConnection = await mongoose.connect(uri, {
        maxIdleTimeMS: 270000,
        minPoolSize: 2,
        maxPoolSize: 4,
      });
      console.log('Conexión exitosa a la base de datos');
    }
    return dbConnection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}
