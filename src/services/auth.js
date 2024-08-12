import { UserCollection } from "../models/user.js";

export const findUserByEmail = async (email) => {
  return UserCollection.findOne({ email });
};

export const createUser = async (userData) => {
  return UserCollection.create(userData);
};