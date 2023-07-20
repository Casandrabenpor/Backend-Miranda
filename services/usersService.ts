import { User } from '../models/interface';
import { hashPassword } from '../util/hashPassword';
import { UserModel } from '../mongoSchemas/userSchemas';
import mongoose from 'mongoose';
import { connectToDb } from '../util/mongoConnector';

export const getUser = async () => {
  await connectToDb();
  let mongoResult = await UserModel.find();
  let result = mongoResult.map((user) => {
    return mapToUserResponse(user);
  });
  return result;
};
export const getById = async (userId: string) => {
  await connectToDb();
  let result = await UserModel.findById(userId);
  return result;
};
export const addUser = async (user: User) => {
  await connectToDb();
  let result = await new UserModel(user).save();
  return mapToUserResponse(result);
};

export const updateUser = async (user: User) => {
  await connectToDb();

  const userId = new mongoose.Types.ObjectId(user.id); // Convertir el valor de user.id a ObjectId

  const result = await UserModel.updateOne(
    { _id: userId }, // Filtro por el campo _id
    user,
  );
};
export const deleteUser = async (id: string) => {
  await connectToDb();
  await UserModel.deleteOne({ _id: id });
};

function parseDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
function formatPhoneNumber(phoneNumber: any) {
  const digitsOnly = phoneNumber.replace(/\D/g, ''); // Elimina todos los caracteres que no sean dígitos
  const formatted = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // Agrega guiones en la posición adecuada
  return formatted;
}

function mapToUserResponse(userModel: any) {
  return {
    contact: formatPhoneNumber(userModel.contact),
    description: userModel.description,
    email: userModel.email,
    password: userModel.password,
    id: userModel._id.toString(),
    name: userModel.name,
    startDate: parseDate(userModel.startDate),
    status: userModel.status,
  } as User;
}
