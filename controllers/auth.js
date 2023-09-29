const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Para gerar tokens JWT
const User = require('../models/UserModel'); // Importe o modelo de usuário

// Função para registro de usuário com criptografia de senha
exports.register = async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Verifique se o email já está em uso
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Criptografe a senha antes de armazená-la no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10); // Use uma salto de 10 rounds

    // Crie um novo usuário com a senha criptografada
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Função de login com validação de senha
exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    // Verifique se o usuário com o email fornecido existe
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verifique se a senha fornecida corresponde à senha armazenada (comparando hashes)
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Se as credenciais estiverem corretas, gere um token JWT para autenticação
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });

    res.status(200).json({ message: 'Login successful', token: token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};
