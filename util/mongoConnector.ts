import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const uri =
  'mongodb+srv://casandra:' +
  process.env.DB_PASSWORD +
  '@miranda.rstgdgt.mongodb.net/hotelmiranda?retryWrites=true&w=majority';

export async function connectToDb() {
  try {
    await mongoose.connect(uri);
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}
