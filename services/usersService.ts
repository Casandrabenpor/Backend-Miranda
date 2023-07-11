import { User } from '../models/interface';
import { hashPassword } from '../util/hashPassword';
import { UserModel } from '../mongoSchemas/userSchemas';
import mongoose from 'mongoose';

export const getUser = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await UserModel.find();
  await mongoose.disconnect();
  return result;
};
export const getById = async (userId: string) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await UserModel.findById(userId);
  await mongoose.disconnect();
  return result;
};
export const addUser = async (user: User) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  let result = await new UserModel(user).save();
  await mongoose.disconnect();
  return result;
};

export const updateUser = async (user: User) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');

  const userId = new mongoose.Types.ObjectId(user.id); // Convertir el valor de user.id a ObjectId

  const result = await UserModel.updateOne(
    { _id: userId }, // Filtro por el campo _id
    user,
  );

  await mongoose.disconnect();
};
export const deleteUser = async (id: string) => {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotelmiranda');
  await UserModel.deleteOne({ _id: id });
};
