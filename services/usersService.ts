import { User } from '../models/interface';
import { hashPassword } from '../util/hashPassword';
import { UserModel } from '../mongoSchemas/userSchemas';
import mongoose from 'mongoose';
import { connectToDb } from '../util/mongoConnector';

export const getUser = async () => {
  await connectToDb();
  let result = await UserModel.find();
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
  return result;
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
