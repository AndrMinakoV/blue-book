const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Подключаемся к MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Модель пользователя
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Регистрация
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Проверка, существует ли уже пользователь
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Пользователь создан', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации', error: error.message });
  }
});

// Авторизация
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Пользователь не найден' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id, message: 'Вход выполнен' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при авторизации', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
