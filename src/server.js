const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Подключаемся к MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  username: String,
  password: { type: String, required: true },
});

// Компиляция модели пользователя
const User = mongoose.model('User', userSchema);

// Мидлвар для логирования в Discord
app.use(async (req, res, next) => {
  // В этом месте нужно убедиться, что вы получаете настоящий IP адрес,
  // Если ваш сервер находится за прокси, вам, возможно, понадобится 'x-forwarded-for' заголовок
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const username = req.user ? req.user.username : "Аноним"; // Если у вас нет системы аутентификации, установите значение по умолчанию
  const currentTime = new Date().toISOString();

  // Здесь мы создаем эмбед для Discord
  const discordData = {
    embeds: [
      {
        title: "Запрос на сервер",
        fields: [
          {
            name: "IP-адрес",
            value: ip,
            inline: true
          },
          {
            name: "Пользователь",
            value: username,
            inline: true
          },
          {
            name: "Время",
            value: currentTime,
            inline: true
          },
          {
            name: "Путь запроса",
            value: req.path,
            inline: false
          }
        ],
        color: 3447003 // Синий цвет
      }
    ]
  };

  if (process.env.DISCORD_WEBHOOK_URL) {
    try {
      await axios.post(process.env.DISCORD_WEBHOOK_URL, discordData);
    } catch (err) {
      console.error('Ошибка логирования в Discord', err);
    }
  }
  next();
});


// Роут регистрации
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Пользователь создан', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации', error: error.message });
  }
});

// Роут входа
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id, message: 'Вход выполнен' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при авторизации', error: error.message });
  }
});

// Запуск сервера
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
