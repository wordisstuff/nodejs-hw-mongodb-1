import createHttpError from 'http-errors';
import { SessionCollection } from '../models/session.js';

// Middleware для аутентифікації користувача
export const authenticate = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw createHttpError(401, 'Authorization header missing');
    }

    const [type, accessToken] = authorizationHeader.split(' ');

    if (type !== 'Bearer' || !accessToken) {
      throw createHttpError(401, 'Invalid authorization format');
    }

    const session = await SessionCollection.findOne({ accessToken });

    if (!session) {
      throw createHttpError(401, 'Invalid access token');
    }

    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      throw createHttpError(401, 'Access token expired');
    }

    req.user = { _id: session.userId }; // Додаємо userId до об'єкту запиту

    next();
  } catch (error) {
    next(error);
  }
};
