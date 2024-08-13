import { UserCollection } from "../models/user.js";
import { SessionCollection } from '../models/session.js';
import { randomBytes } from 'crypto';
// import createHttpError from 'http-errors';
// Константи для часу життя токенів
const FIFTEEN_MINUTES = 15 * 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;

export const findUserByEmail = async (email) => {
  return UserCollection.findOne({ email });
};

export const createUser = async (userData) => {
  return UserCollection.create(userData);
};

// Створення нової сесії для користувача
export const createSession = async (userId) => {
  // Генеруємо access та refresh токени
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  // Записуємо нову сесію в базу даних
  const session = await SessionCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

  return { session};
};

// Функція для видалення старої сесії за userId
export const deleteSessionByUserId = async (userId) => {
  await SessionCollection.deleteOne({ userId });
};