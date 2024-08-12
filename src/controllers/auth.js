import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import UserCollection from '../models/user.js'; // Ваша модель користувача

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
