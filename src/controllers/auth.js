import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import {UserCollection} from '../models/user.js';
// import {SessionCollection} from "../models/session.js";
import { createSession, deleteSessionByUserId } from '../services/auth.js';


// Контролер для реєстрації
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Перевірка, чи вже існує користувач з таким email
    const existingUser = await UserCollection.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, 'Email in use');
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const newUser = await UserCollection.create({ name, email, password: hashedPassword });

    // Видалення пароля з відповіді
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

// Контролер для логіну
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Перевірка існування користувача
    const user = await UserCollection.findOne({ email });
    if (!user) {
      throw createHttpError(401, 'Invalid email or password');
    }

    // Перевірка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createHttpError(401, 'Invalid email or password');
    }

    // Видаляємо стару сесію, якщо вона існує
    await deleteSessionByUserId(user._id);

    // Створюємо нову сесію для користувача
    const session = await createSession(user._id);

    // Встановлюємо refreshToken в cookies
    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: session.refreshTokenValidUntil - Date.now(), // Встановлюємо час життя cookie
    });

    // Відправляємо відповідь з новим accessToken
    res.status(200).json({
      status: 200,
      message: 'Successfully logged in an user!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(error); // Передаємо помилку для подальшої обробки middleware
  }
};