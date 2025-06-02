const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

const users = [];

function findUser(username) {
  return users.find((user) => user.username === username);
}

async function createUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = {
    id: users.length + 1,
    username: userData.username,
    password: hashedPassword,
    email: userData.email,
  };

  users.push(newUser);

  return newUser;
}

const verifyPassword = async (receivedPassword, hashedPassword) => {
  return bcrypt.compare(receivedPassword, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Middlewares
app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token = "";

  if (authHeader) {
    token = authHeader.split(" ")[1]; // Bearer TOKEN
  }

  if (!token) {
    res.status(401).json({ message: "Token is missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  });
};

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = findUser(username);
    if (existingUser) {
      res.status(409).json({ message: "Username already exists!" });
    }

    const user = await createUser({ username, password, email });

    if (user) {
      res.status(201).json({
        message: "User registered successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering the user" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required!" });
    }

    const user = findUser(username);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);

    res.status(200).json({ message: "User logged in", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during login" });
  }
});

app.get("/api/user/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Reached protected route",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
